import { Inject, Injectable } from '@nestjs/common';
import { IRequestTopicItem } from '../interfaces/IRequestTopicItem';
import {
  MEDIA_REPOSITORY,
  TOPIC_REQUEST_ITEM_REPOSITORY,
} from '../database/constants';
import { TopicRequestItem } from './topic-request-item.model';
import { Topic } from '../topic/topic.model';
import { Media } from '../media/media.model';

type IRequestTopicBody = {
  id: number;
  isApproved: boolean;
  isRejected: boolean;
};
@Injectable()
export class TopicRequestItemService {
  constructor(
    @Inject(TOPIC_REQUEST_ITEM_REPOSITORY)
    private readonly topicRequestItemRepository: typeof TopicRequestItem,
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: typeof Media,
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

  async confirmRequest(requestData: IRequestTopicBody) {
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
    const KEY = topicRequest.key;
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
      const requestType = topicRequest.dataValues.requestType;
      if (requestType === 'update') {
        topic.update({ [KEY]: topicRequest.content });
      } else if (requestType === 'add') {
        if (KEY === 'types') {
          topic.update({
            types: [
              ...topic.dataValues.types.split(','),
              topicRequest.dataValues.content,
            ]
              .filter(Boolean)
              .join(','),
          });
        } else if (KEY === 'medias' || KEY === 'media') {
          const { description, name, featuredImage } = JSON.parse(
            topicRequest.dataValues.content,
          );
          if (description && name && featuredImage) {
            this.mediaRepository.create({
              topicId: topicRequest.topicId,
              description,
              name,
              featuredImage,
              creatorId: 1,
            });
          } else {
            return { success: false, message: 'Error: Missing data' };
          }
        }
      } else if (requestType === 'remove') {
        if (KEY === 'types') {
          topic.update({
            types: topic.dataValues.types
              .split(',')
              .filter((t) => t !== '' && t !== topicRequest.dataValues.content)
              .join(','),
          });
        }
      }
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
