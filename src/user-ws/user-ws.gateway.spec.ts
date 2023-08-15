import { Test, TestingModule } from '@nestjs/testing';
import { UserWsGateway } from './user-ws.gateway';

describe('UserWsGateway', () => {
  let gateway: UserWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWsGateway],
    }).compile();

    gateway = module.get<UserWsGateway>(UserWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
