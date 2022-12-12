import { Inject, Injectable } from '@nestjs/common';
import { IRequestTopicChange } from '../interfaces/IRequestTopicChange';
import { TOPIC_REQUEST_CHANGE_REPOSITORY } from '../database/constants';
import { TopicRequestChange } from './topic-request-change.model';

@Injectable()
export class TopicRequestChangeService {
  constructor(
    @Inject(TOPIC_REQUEST_CHANGE_REPOSITORY)
    private readonly topicRequestChangeRepository: typeof TopicRequestChange,
  ) {}

  async create(requestTopic: IRequestTopicChange): Promise<TopicRequestChange> {
    return await this.topicRequestChangeRepository.create<TopicRequestChange>(
      requestTopic,
    );
  }

  async findByTopicId(topicId: number): Promise<TopicRequestChange[]> {
    return this.topicRequestChangeRepository.findAll<TopicRequestChange>({
      where: { topicId: Number(topicId) },
    });
  }
}
