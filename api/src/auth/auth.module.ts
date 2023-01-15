import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.provider';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, ...authProviders],
  controllers: [AuthController],
})
export class AuthModule {}
