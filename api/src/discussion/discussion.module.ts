import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { discussionsProviders } from './discussion.provider';
//
import { MessageService } from '../message/message.service';

@Module({
  providers: [DiscussionService, ...discussionsProviders, MessageService],
  controllers: [DiscussionController],
})
export class DiscussionModule {}
