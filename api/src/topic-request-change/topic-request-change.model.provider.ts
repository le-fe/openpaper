import { TopicRequestChange } from './topic-request-change.model';
import { TOPIC_REQUEST_CHANGE_REPOSITORY } from '../database/constants';

export const topicRequestChangesProviders = [
  {
    provide: TOPIC_REQUEST_CHANGE_REPOSITORY,
    useValue: TopicRequestChange,
  },
];
