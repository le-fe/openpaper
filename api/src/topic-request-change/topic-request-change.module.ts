import { Module } from '@nestjs/common';
import { TopicRequestChangeController } from './topic-request-change.controller';
import { TopicRequestChangeService } from './topic-request-change.service';
import { topicRequestChangesProviders } from './topic-request-change.model.provider';

@Module({
  controllers: [TopicRequestChangeController],
  providers: [TopicRequestChangeService, ...topicRequestChangesProviders],
})
export class TopicRequestChangeModule {}
