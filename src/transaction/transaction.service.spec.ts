const mockEasyFinanceService = {};

jest.mock('../easy-finance/easy-finance.service', () => ({
  EasyFinanceService: jest
    .fn()
    .mockImplementation(() => mockEasyFinanceService),
}));

const mockFinanceStoreService = {};

jest.mock('../finance-store/finance-store.service', () => ({
  FinanceStoreService: jest
    .fn()
    .mockImplementation(() => mockFinanceStoreService),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { FinanceStoreService } from '../finance-store/finance-store.service';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, EasyFinanceService, FinanceStoreService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  test('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
