import { TopicRequestItem } from './topic-request-item.model';
import {
  MEDIA_REPOSITORY,
  TOPIC_REQUEST_ITEM_REPOSITORY,
} from '../database/constants';
import { Media } from 'src/media/media.model';

export const topicRequestItemProviders = [
  {
    provide: TOPIC_REQUEST_ITEM_REPOSITORY,
    useValue: TopicRequestItem,
  },
  {
    provide: MEDIA_REPOSITORY,
    useValue: Media,
  },
];
