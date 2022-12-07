import { Controller, Get, Query, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ITopic } from '../interfaces/ITopic';
import { User } from '../user/user.model';
import { Media } from '../media/media.model';

@Controller('topic')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  async findAll(): Promise<ITopic[]> {
    return await this.topicService.findAll({
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName', 'avatar'] },
        {
          model: Media,
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
    return await this.topicService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ITopic> {
    return await this.topicService.findOne(id);
  }
}
