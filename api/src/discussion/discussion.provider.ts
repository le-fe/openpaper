import { Discussion } from './discussion.model';
import { Message } from '../message/message.model';
import { DISCUSSION_REPOSITORY } from '../database/constants';
import { MESSAGE_REPOSITORY } from '../database/constants';

export const discussionsProviders = [
  {
    provide: DISCUSSION_REPOSITORY,
    useValue: Discussion,
  },
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
