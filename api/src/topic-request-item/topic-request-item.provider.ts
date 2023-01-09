import { TopicRequestItem } from './topic-request-item.model';
import {
  TOPIC_ITEM_REPOSITORY,
  TOPIC_REQUEST_ITEM_REPOSITORY,
} from '../database/constants';
import { TopicItem } from '../topic-item/topic-item.model';

export const topicRequestItemProviders = [
  {
    provide: TOPIC_REQUEST_ITEM_REPOSITORY,
    useValue: TopicRequestItem,
  },
  {
    provide: TOPIC_ITEM_REPOSITORY,
    useValue: TopicItem,
  },
];
