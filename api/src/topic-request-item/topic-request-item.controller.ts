import { Controller, Get, Post, Body, Request, Param } from '@nestjs/common';
import { IRequestTopicItem } from 'src/interfaces/IRequestTopicItem';
import { TopicRequestItem } from './topic-request-item.model';
import { TopicRequestItemService } from './topic-request-item.service';

@Controller('topic-request-item')
export class TopicRequestItemController {
  constructor(
    private readonly topicRequestItemService: TopicRequestItemService,
  ) {}

  @Get('/t/:topicId')
  async findByTopicId(
    @Param('topicId') topicId: number,
  ): Promise<IRequestTopicItem[]> {
    return await this.topicRequestItemService.findByTopicId(topicId);
  }

  @Post()
  async create(
    @Body() requestTopicData: IRequestTopicItem,
    @Request() req,
  ): Promise<TopicRequestItem> {
    // create a new post and return the newly created post
    return await this.topicRequestItemService.create(requestTopicData);
  }

  @Post('/confirm')
  async confirmRequest(@Body() confirmRequestData, @Request() req) {
    // create a new post and return the newly created post
    return await this.topicRequestItemService.confirmRequest(
      confirmRequestData,
    );
  }
}
