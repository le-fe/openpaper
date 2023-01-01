import { Message } from './message.model';
import { MESSAGE_REPOSITORY } from '../database/constants';

export const topicsProviders = [
  {
    provide: MESSAGE_REPOSITORY,
    useValue: Message,
  },
];
