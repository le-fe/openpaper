import { Test, TestingModule } from '@nestjs/testing';
import { TopicRequestChangeService } from './topic-request-change.service';

describe('TopicRequestChangeService', () => {
  let service: TopicRequestChangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicRequestChangeService],
    }).compile();

    service = module.get<TopicRequestChangeService>(TopicRequestChangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
