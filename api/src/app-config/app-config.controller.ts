import { Controller, Get } from '@nestjs/common';
import { IAppConfig } from '../interfaces/IAppConfig';
import { AppConfigService } from './app-config.service';

@Controller('app-config')
export class AppConfigController {
  constructor(private appConfigService: AppConfigService) {}

  @Get()
  async findAll(): Promise<IAppConfig[]> {
    return await this.appConfigService.findAll({});
  }
}
