import { Module } from '@nestjs/common';
import { AppConfigController } from './app-config.controller';
import { AppConfigService } from './app-config.service';
import { appConfigsProviders } from './app-config.provider';

@Module({
  controllers: [AppConfigController],
  providers: [AppConfigService, ...appConfigsProviders],
})
export class AppConfigModule {}
