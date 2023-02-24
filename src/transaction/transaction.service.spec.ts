const mockEasyFinanceService = {};

jest.mock('../easy-finance/easy-finance.service', () => ({
  EasyFinanceService: jest
    .fn()
    .mockImplementation(() => mockEasyFinanceService),
}));

const mockGet = jest.fn();
const mockSet = jest.fn();

const mockCache = {
  get: mockGet,
  set: mockSet,
};

import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        EasyFinanceService,
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    mockGet.mockResolvedValue(undefined);

    service = module.get<TransactionService>(TransactionService);
  });

  test('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
