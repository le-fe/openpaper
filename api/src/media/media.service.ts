import { Injectable, Inject } from '@nestjs/common';
import { IMedia } from '../interfaces/IMedia';
import { Media } from './media.model';
import { MEDIA_REPOSITORY } from '../database/constants';

@Injectable()
export class MediaService {
  constructor(
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: typeof Media,
  ) {}

  async findAll(queries: object): Promise<IMedia[]> {
    return await this.mediaRepository.findAll<Media>({ ...queries });
  }

  async findByTopicId(topicId: number): Promise<IMedia[]> {
    return await this.mediaRepository.findAll<Media>({ where: { topicId } });
  }
}
