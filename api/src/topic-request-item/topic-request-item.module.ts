import { Module } from '@nestjs/common';
import { TopicRequestItemController } from './topic-request-item.controller';
import { topicRequestItemProviders } from './topic-request-item.provider';
import { TopicRequestItemService } from './topic-request-item.service';

@Module({
  providers: [TopicRequestItemService, ...topicRequestItemProviders],
  controllers: [TopicRequestItemController],
})
export class TopicRequestItemModule {}
