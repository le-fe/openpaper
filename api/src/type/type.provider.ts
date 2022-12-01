import { Type } from './type.model';
import { TYPE_REPOSITORY } from '../database/constants';

export const typesProviders = [
  {
    provide: TYPE_REPOSITORY,
    useValue: Type,
  },
];
