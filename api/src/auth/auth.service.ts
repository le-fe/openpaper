import { Injectable, Inject } from '@nestjs/common';
import type {
  ILoginRequestData,
  IRegisterRequestData,
} from '../interfaces/IAuth';
import { User } from '../user/user.model';
import { USER_REPOSITORY } from '../database/constants';
import * as bcrypt from 'bcrypt';
import AUTH_SETTINGS from './auth.settings';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async login(data: ILoginRequestData) {
    const user = await this.userRepository.findOne({
      where: { username: data.username },
    });
    if (!user) {
      return { ok: false, message: 'USER_HAS_NOT_EXISTED' };
    }
    return { ok: true, user };
  }

  async register(data: IRegisterRequestData) {
    const hash = await bcrypt.hash(
      data.password,
      AUTH_SETTINGS.passwordHashSaltRounds,
    );
    const salt = await bcrypt.genSalt();
    const isMatch = await bcrypt.compare(data.password, hash);
    return { ok: true, salt, isMatch, data };
  }
}
