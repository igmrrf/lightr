import { Test, TestingModule } from '@nestjs/testing';
import { AuthWsGateway } from './auth-ws.gateway';

describe('AuthWsGateway', () => {
  let gateway: AuthWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthWsGateway],
    }).compile();

    gateway = module.get<AuthWsGateway>(AuthWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
