import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
//import { MessageController } from './message.controller';
import { messageProviders } from './message.provider';

@Module({
  providers: [MessageService, ...messageProviders],
  controllers: [],
})
export class MessageModule {}
