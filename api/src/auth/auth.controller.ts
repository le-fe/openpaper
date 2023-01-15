import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type {
  ILoginRequestData,
  IRegisterRequestData,
} from '../interfaces/IAuth';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() requestData: ILoginRequestData) {
    return await this.service.login(requestData);
  }

  @Post('register')
  async register(@Body() requestData: IRegisterRequestData) {
    return await this.service.register(requestData);
  }
}
