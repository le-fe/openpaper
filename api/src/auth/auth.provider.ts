import { User } from '../user/user.model';
import { USER_REPOSITORY } from '../database/constants';

export const authProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
