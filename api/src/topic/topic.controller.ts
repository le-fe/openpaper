import { Controller, Get, Query, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ITopic } from '../interfaces/ITopic';
import { User } from '../user/user.model';
import { TopicItem } from '../topic-item/topic-item.model';

@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  async list(): Promise<ITopic[]> {
    return await this.topicService.list({
      include: [
        { model: User, attributes: ['id', 'nickname', 'avatar'] },
        {
          model: TopicItem,
          attributes: ['id', 'name', 'types', 'featuredImage'],
          limit: 10,
        },
      ],
    });
  }

  @Get('/trending')
  async findTrendings(@Query() query): Promise<ITopic[]> {
    let queries = {};
    if (query.limit) queries['limit'] = query.limit;
    return await this.topicService.list(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ITopic> {
    return await this.topicService.findOne(id);
  }
}
