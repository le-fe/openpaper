import { Inject, Injectable } from '@nestjs/common';
import { IRequestTopicItem } from '../interfaces/IRequestTopicItem';
import { TOPIC_REQUEST_ITEM_REPOSITORY } from '../database/constants';
import { TopicRequestItem } from './topic-request-item.model';
import { Topic } from '../topic/topic.model';

@Injectable()
export class TopicRequestItemService {
  constructor(
    @Inject(TOPIC_REQUEST_ITEM_REPOSITORY)
    private readonly topicRequestItemRepository: typeof TopicRequestItem,
  ) {}

  async create(requestTopic: IRequestTopicItem): Promise<TopicRequestItem> {
    return await this.topicRequestItemRepository.create<TopicRequestItem>(
      requestTopic,
    );
  }

  async findByTopicId(topicId: number): Promise<TopicRequestItem[]> {
    return this.topicRequestItemRepository.findAll<TopicRequestItem>({
      where: { topicId: Number(topicId) },
    });
  }

  async confirmRequest(requestData) {
    if (!requestData.hasOwnProperty('id')) {
      return { succes: false, message: 'Required id' };
    }
    if (
      !requestData.hasOwnProperty('isApproved') &&
      !requestData.hasOwnProperty('isRejected')
    ) {
      return { succes: false, message: 'Required isApproved or isRejected' };
    }
    const topicRequest: TopicRequestItem =
      await this.topicRequestItemRepository.findOne({
        where: { id: requestData.id },
      });
    if (!topicRequest) {
      return { succes: false, message: 'Topic with request id is not existed' };
    }
    if (requestData.isApproved) {
      /** Approve request */
      const topic: Topic = await Topic.findOne({
        where: { id: topicRequest.topicId },
      });
      if (!topic) {
        return {
          succes: false,
          message: 'Topic with including in request is not existed',
        };
      }
      topic.update({ [topicRequest.key]: topicRequest.content });
      topicRequest.update({ isRejected: false, isApproved: true });
      return { success: true, message: 'Topic request has been approved' };
    } else if (requestData.isRejected) {
      /** Reject request */
      topicRequest.update({ isRejected: true, isApproved: false });
      return { success: true, message: 'Topic request has been rejected' };
    }
    return { success: false, message: 'Error' };
  }
}
