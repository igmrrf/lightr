import { Test, TestingModule } from '@nestjs/testing';
import { ZegoTokenGeneratorService } from './zego-token-generator.service';

describe('ZegoTokenGeneratorService', () => {
  let service: ZegoTokenGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZegoTokenGeneratorService],
    }).compile();

    service = module.get<ZegoTokenGeneratorService>(ZegoTokenGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
