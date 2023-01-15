import { Injectable, Inject } from '@nestjs/common';
import { ITopicItem } from '../interfaces/ITopicItem';
import { TopicItem } from './topic-item.model';
import { TOPIC_ITEM_REPOSITORY } from '../database/constants';
import { paginateResponse } from '../common/utils/pagination';

@Injectable()
export class TopicItemService {
  constructor(
    @Inject(TOPIC_ITEM_REPOSITORY)
    private readonly repository: typeof TopicItem,
  ) {}

  async create(data: object): Promise<ITopicItem> {
    return await this.repository.create<TopicItem>(data);
  }

  async findAll(queries) {
    const limit = queries?.limit || 10;
    const page = queries?.page || 1;
    const offset = (page - 1) * limit;
    const data = await this.repository.findAndCountAll<TopicItem>({
      ...queries,
      limit,
      offset,
    });
    return paginateResponse(data, page, limit);
  }

  async findOne(id: number): Promise<ITopicItem> {
    return await this.repository.findOne<TopicItem>({
      where: { id },
    });
  }
}
