import { Topic } from './topic.model';
import { TOPIC_REPOSITORY } from '../database/constants';

export const topicsProviders = [{
    provide: TOPIC_REPOSITORY,
    useValue: Topic,
}];