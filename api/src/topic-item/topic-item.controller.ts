import { Controller, Get, Query, Param } from '@nestjs/common';
import { TopicItemService } from './topic-item.service';

@Controller('topic-item')
export class TopicItemController {
  constructor(private topicItemService: TopicItemService) {}

  @Get()
  async list(@Query() query) {
    if (!query.topicId) return [];
    let queries = { where: { topicId: query.topicId } };
    if (query.limit) queries['limit'] = query.limit;
    if (query.page) queries['page'] = query.page;
    return await this.topicItemService.findAll(queries);
  }
}
