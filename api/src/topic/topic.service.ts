import { Inject, Injectable } from '@nestjs/common';
import { ITopic } from '../interfaces/ITopic';
import { Topic } from './topic.model';
import { TOPIC_REPOSITORY } from '../database/constants';

@Injectable()
export class TopicService {
  constructor(
    @Inject(TOPIC_REPOSITORY) private readonly topicRepository: typeof Topic,
  ) {}
  private readonly topics: ITopic[] = [];

  async list(queries: object): Promise<ITopic[]> {
    return await this.topicRepository.findAll<Topic>({ ...queries });
  }

  async findOne(id: number): Promise<ITopic> {
    return await this.topicRepository.findOne<Topic>({ where: { id } });
  }
}
