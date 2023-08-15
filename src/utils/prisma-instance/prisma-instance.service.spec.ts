import { Test, TestingModule } from '@nestjs/testing';
import { PrismaInstanceService } from './prisma-instance.service';

describe('PrismaInstanceService', () => {
  let service: PrismaInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaInstanceService],
    }).compile();

    service = module.get<PrismaInstanceService>(PrismaInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
