import { Module } from '@nestjs/common';
import { mediaProviders } from './media.provider';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  providers: [MediaService, ...mediaProviders],
  controllers: [MediaController]
})
export class MediaModule { }
