import { Discussion } from './discussion.model';
import { DISCUSSION_REPOSITORY } from '../database/constants';

export const discussionsProviders = [
  {
    provide: DISCUSSION_REPOSITORY,
    useValue: Discussion,
  },
];
