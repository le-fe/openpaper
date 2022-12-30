import { Inject, Injectable } from '@nestjs/common';
import { IDiscussion } from '../interfaces/IDiscussion';
import { DISCUSSION_REPOSITORY } from '../database/constants';
import { Discussion } from './discussion.model';
import { paginateResponse } from '../common/utils/pagination';

@Injectable()
export class DiscussionService {
  constructor(
    @Inject(DISCUSSION_REPOSITORY)
    private readonly repository: typeof Discussion,
  ) {}

  async create(payload: IDiscussion): Promise<Discussion> {
    return await this.repository.create<Discussion>(payload);
  }

  async list(queries) {
    const limit = queries?.limit || 10;
    const page = queries?.page || 1;
    const offset = (page - 1) * limit;
    let where = {};
    const topicId = queries.topicId;
    if (topicId) where['topicId'] = topicId;
    const data = await this.repository.findAndCountAll<Discussion>({
      where,
      limit,
      offset,
    });
    return paginateResponse(data, page, limit);
  }

  async get(id: number): Promise<IDiscussion> {
    return await this.repository.findOne<Discussion>({ where: { id } });
  }
}
