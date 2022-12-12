import { TopicRequestItem } from './topic-request-item.model';
import { TOPIC_REQUEST_ITEM_REPOSITORY } from '../database/constants';

export const topicRequestItemProviders = [
  {
    provide: TOPIC_REQUEST_ITEM_REPOSITORY,
    useValue: TopicRequestItem,
  },
];
