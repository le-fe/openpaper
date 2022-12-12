import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common';
import { IRequestTopicChange } from '../interfaces/IRequestTopicChange';
import { TopicRequestChange } from './topic-request-change.model';
import { TopicRequestChangeService } from './topic-request-change.service';

@Controller('topic-request-change')
export class TopicRequestChangeController {
  constructor(
    private readonly topicRequestChangeService: TopicRequestChangeService,
  ) {}

  @Get('/t/:topicId')
  async findByTopicId(
    @Param('topicId') topicId: number,
  ): Promise<IRequestTopicChange[]> {
    return await this.topicRequestChangeService.findByTopicId(topicId);
  }

  @Post()
  async create(
    @Body() requestTopicData: IRequestTopicChange,
    @Request() req,
  ): Promise<TopicRequestChange> {
    // create a new post and return the newly created post
    return await this.topicRequestChangeService.create(requestTopicData);
  }
}
