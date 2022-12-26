import { AppConfig } from './app-config.model';
import { APP_CONFIG_REPOSITORY } from '../database/constants';

export const appConfigsProviders = [
  {
    provide: APP_CONFIG_REPOSITORY,
    useValue: AppConfig,
  },
];
