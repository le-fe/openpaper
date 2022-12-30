import { Message } from './message.model';
import { DISCUSSION_COMMENT_REPOSITORY } from '../database/constants';

export const topicsProviders = [
  {
    provide: DISCUSSION_COMMENT_REPOSITORY,
    useValue: Message,
  },
];
