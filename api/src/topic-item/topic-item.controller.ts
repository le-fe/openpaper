import { Controller, Get, Query, Param } from '@nestjs/common';
import { TopicItemService } from './topic-item.service';
import { ITopicItem } from '../interfaces/ITopicItem';

@Controller('topic-item')
export class TopicItemController {
  constructor(private service: TopicItemService) {}

  @Get()
  async list(@Query() query) {
    if (!query.topicId) return [];
    let queries = { where: { topicId: query.topicId } };
    if (query.limit) queries['limit'] = query.limit;
    if (query.page) queries['page'] = query.page;
    return await this.service.findAll(queries);
  }

  @Get(':id')
  async retrieve(@Param('id') id: number): Promise<ITopicItem> {
    return await this.service.findOne(id);
  }
}
