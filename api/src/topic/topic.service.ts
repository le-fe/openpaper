import { Inject, Injectable } from '@nestjs/common';
import { ITopic } from '../interfaces/Topic';
import { Topic } from './topic.model';
import { TOPIC_REPOSITORY } from '../database/constants';

@Injectable()
export class TopicService {
    constructor(@Inject(TOPIC_REPOSITORY) private readonly topicRepository: typeof Topic) { }
    private readonly topics: ITopic[] = [];

    async findAll(queries: object): Promise<ITopic[]> {
        return await this.topicRepository.findAll<Topic>({ ...queries });
    }
}
