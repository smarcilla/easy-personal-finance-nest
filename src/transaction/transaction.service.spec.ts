const mockEasyFinanceService = {};

jest.mock('../easy-finance/easy-finance.service', () => ({
  EasyFinanceService: jest
    .fn()
    .mockImplementation(() => mockEasyFinanceService),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, EasyFinanceService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
