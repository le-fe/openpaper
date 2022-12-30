import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { discussionsProviders } from './discussion.provider';

@Module({
  providers: [DiscussionService, ...discussionsProviders],
  controllers: [DiscussionController],
})
export class DiscussionModule {}
