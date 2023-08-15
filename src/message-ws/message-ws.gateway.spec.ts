import { Test, TestingModule } from '@nestjs/testing';
import { MessageWsGateway } from './message-ws.gateway';

describe('MessageWsGateway', () => {
  let gateway: MessageWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageWsGateway],
    }).compile();

    gateway = module.get<MessageWsGateway>(MessageWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
