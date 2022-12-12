import { Test, TestingModule } from '@nestjs/testing';
import { TopicRequestItemController } from './topic-request-item.controller';

describe('TopicRequestItemController', () => {
  let controller: TopicRequestItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicRequestItemController],
    }).compile();

    controller = module.get<TopicRequestItemController>(TopicRequestItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
