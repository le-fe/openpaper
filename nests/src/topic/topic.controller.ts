import { Controller, Get, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ITopic } from '../interfaces/Topic';

@Controller('topic')
export class TopicController {
    constructor(private topicService: TopicService) { }

    @Get()
    async findAll(): Promise<ITopic[]> {
        return await this.topicService.findAll({});
    }

    @Get('/trending')
    async findTrendings(@Query() query): Promise<ITopic[]> {
        let queries = {}
        if (query.limit) queries['limit'] = query.limit
        return await this.topicService.findAll(queries);
    }

    // @Get(:id)
    // findOne(@Param('id') id: number): string {
    //     return 'This action returns one post';
    // }
}
