import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from '../interfaces/IMessage';
import { Message } from './message.model';
import { MESSAGE_REPOSITORY } from '../database/constants';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly repository: typeof Message,
  ) {}

  async list(queries: object): Promise<IMessage[]> {
    return await this.repository.findAll<Message>({ ...queries });
  }

  async findOne(id: number): Promise<IMessage> {
    return await this.repository.findOne<Message>({ where: { id } });
  }
}
