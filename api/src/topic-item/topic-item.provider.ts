import { TopicItem } from './topic-item.model';
import { TOPIC_ITEM_REPOSITORY } from '../database/constants';

export const topicItemProviders = [
  {
    provide: TOPIC_ITEM_REPOSITORY,
    useValue: TopicItem,
  },
];
