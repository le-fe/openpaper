import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { typesProviders } from './type.provider';

@Module({
  controllers: [TypeController],
  providers: [TypeService, ...typesProviders],
})
export class TypeModule {}
