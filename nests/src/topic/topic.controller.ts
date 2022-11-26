import { Controller, Get } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ITopic } from '../interfaces/Topic';

@Controller('topic')
export class TopicController {
    constructor(private topicService: TopicService) { }

    @Get()
    async findAll(): Promise<ITopic[]> {
        return await this.topicService.findAll();
    }

    // @Get(:id)
    // findOne(@Param('id') id: number): string {
    //     return 'This action returns one post';
    // }
}
