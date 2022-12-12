import { Test, TestingModule } from '@nestjs/testing';
import { TopicRequestItemService } from './topic-request-item.service';

describe('TopicRequestItemService', () => {
  let service: TopicRequestItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicRequestItemService],
    }).compile();

    service = module.get<TopicRequestItemService>(TopicRequestItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
