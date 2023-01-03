import { Inject, Injectable } from '@nestjs/common';
import { IMessage, IMessageQueries } from '../interfaces/IMessage';
import { Message } from './message.model';
import { MESSAGE_REPOSITORY } from '../database/constants';
import { randomName } from '../common/utils/random-name';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly repository: typeof Message,
  ) {}

  async create(
    discussionId: number,
    ipAddress: string,
    payload: IMessage,
  ): Promise<Message> {
    return await this.repository.create<Message>({
      discussionId,
      creatorId: `${randomName()}[${ipAddress}]`,
      ...payload,
    });
  }

  async list(queries: IMessageQueries) {
    let where = {};
    if (queries.discussionId) where['discussionId'] = queries.discussionId;
    return await this.repository.findAll<Message>({ where });
  }

  async findOne(id: number) {
    return await this.repository.findOne<Message>({ where: { id } });
  }
}
