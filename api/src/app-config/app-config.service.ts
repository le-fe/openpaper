import { Inject, Injectable } from '@nestjs/common';
import { IAppConfig } from '../interfaces/IAppConfig';
import { AppConfig } from './app-config.model';
import { APP_CONFIG_REPOSITORY } from '../database/constants';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(APP_CONFIG_REPOSITORY)
    private readonly appConfigRepository: typeof AppConfig,
  ) {}
  private readonly appConfigs: IAppConfig[] = [];

  async findAll(queries: object): Promise<IAppConfig[]> {
    return await this.appConfigRepository.findAll<AppConfig>({ ...queries });
  }
}
