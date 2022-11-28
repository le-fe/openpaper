import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { topicsProviders } from './topic.provider';

@Module({
  providers: [TopicService, ...topicsProviders],
  controllers: [TopicController]
})
export class TopicModule {}
