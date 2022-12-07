import { Controller, Get, Query, Param } from '@nestjs/common';
import { IMedia } from '../interfaces/IMedia';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async findAll(@Query() query): Promise<IMedia[]> {
    if (!query.topicId) return [];
    let queries = { where: { topicId: query.topicId } };
    if (query.limit) queries['limit'] = query.limit;
    return await this.mediaService.findAll(queries);
  }
}
