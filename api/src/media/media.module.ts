import { Module } from '@nestjs/common';
import { mediaProviders } from './media.provider';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService, ...mediaProviders]
})
export class MediaModule { }
