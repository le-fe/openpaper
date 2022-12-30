import { Injectable, Inject } from '@nestjs/common';
import { IMedia } from '../interfaces/IMedia';
import { Media } from './media.model';
import { MEDIA_REPOSITORY } from '../database/constants';
import { paginateResponse } from '../common/utils/pagination';

@Injectable()
export class MediaService {
  constructor(
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: typeof Media,
  ) {}

  async create(data: object): Promise<IMedia> {
    return await this.mediaRepository.create<Media>(data);
  }

  async findAll(queries) {
    const limit = queries?.limit || 10;
    const page = queries?.page || 1;
    const offset = (page - 1) * limit;
    const data = await this.mediaRepository.findAndCountAll<Media>({
      ...queries,
      limit,
      offset,
    });
    return paginateResponse(data, page, limit);
  }

  async findByTopicId(topicId: number): Promise<IMedia[]> {
    return await this.mediaRepository.findAll<Media>({ where: { topicId } });
  }
}
