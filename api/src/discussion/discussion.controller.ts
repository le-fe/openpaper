import {
  Controller,
  Post,
  Body,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { IDiscussion } from '../interfaces/IDiscussion';
import { DiscussionService } from './discussion.service';
import { MessageService } from '../message/message.service';

@Controller('discussion')
export class DiscussionController {
  constructor(
    private readonly service: DiscussionService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  async create(
    @Body() requestData: IDiscussion,
    @Request() req,
  ): Promise<IDiscussion> {
    // create a new post and return the newly created post
    return await this.service.create(requestData);
  }

  @Get()
  async list(@Query() query) {
    return await this.service.list(query);
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<IDiscussion> {
    return await this.service.get(id);
  }

  @Get(':id/message/')
  async listMessage(@Param('id') id: number) {
    return await this.messageService.list({ discussionId: id });
  }
}
