import { Module } from '@nestjs/common';
import { topicItemProviders } from './topic-item.provider';
import { TopicItemService } from './topic-item.service';
import { TopicItemController } from './topic-item.controller';

@Module({
  providers: [TopicItemService, ...topicItemProviders],
  controllers: [TopicItemController],
})
export class TopicItemModule {}
