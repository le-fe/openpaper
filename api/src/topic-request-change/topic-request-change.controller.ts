import { Controller, Post, Body, Request } from '@nestjs/common';
import { IRequestTopicChange } from '../interfaces/IRequestTopicChange';
import { TopicRequestChange } from './topic-request-change.model';
import { TopicRequestChangeService } from './topic-request-change.service';

@Controller('topic-request-change')
export class TopicRequestChangeController {
  constructor(
    private readonly topicRequestChangeService: TopicRequestChangeService,
  ) {}

  @Post()
  async create(
    @Body() requestTopicData: IRequestTopicChange,
    @Request() req,
  ): Promise<TopicRequestChange> {
    // create a new post and return the newly created post
    return await this.topicRequestChangeService.create(requestTopicData);
  }
}
