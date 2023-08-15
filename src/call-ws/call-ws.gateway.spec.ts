import { Test, TestingModule } from '@nestjs/testing';
import { CallWsGateway } from './call-ws.gateway';

describe('CallWsGateway', () => {
  let gateway: CallWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallWsGateway],
    }).compile();

    gateway = module.get<CallWsGateway>(CallWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
