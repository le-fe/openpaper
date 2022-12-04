import { COUNTRY_REPOSITORY } from '../database/constants';
import { Country } from './country.model';

export const countriesProviders = [
  {
    provide: COUNTRY_REPOSITORY,
    useValue: Country,
  },
];
