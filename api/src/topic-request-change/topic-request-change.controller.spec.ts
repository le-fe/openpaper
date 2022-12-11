import { Test, TestingModule } from '@nestjs/testing';
import { TopicRequestChangeController } from './topic-request-change.controller';

describe('TopicRequestChangeController', () => {
  let controller: TopicRequestChangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicRequestChangeController],
    }).compile();

    controller = module.get<TopicRequestChangeController>(TopicRequestChangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
