import { Controller, Get, Query, Param } from '@nestjs/common';
import { IMedia } from '../interfaces/IMedia';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async findAll(@Query() query) {
    if (!query.topicId) return [];
    let queries = { where: { topicId: query.topicId } };
    if (query.limit) queries['limit'] = query.limit;
    if (query.page) queries['page'] = query.page;
    return await this.mediaService.findAll(queries);
  }
}
