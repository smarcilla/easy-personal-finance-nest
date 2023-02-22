import { Test, TestingModule } from '@nestjs/testing';
import EasyFinance from 'easy-personal-finance';
import { EasyFinanceService } from './easy-finance.service';

describe('EasyFinanceService', () => {
  let service: EasyFinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EasyFinanceService,
        { provide: EasyFinance, useClass: EasyFinance },
      ],
    }).compile();

    service = module.get<EasyFinanceService>(EasyFinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
