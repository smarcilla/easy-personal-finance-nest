const mockEasyFinanceService = {};

jest.mock('../easy-finance/easy-finance.service', () => ({
  EasyFinanceService: jest
    .fn()
    .mockImplementation(() => mockEasyFinanceService),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction/transaction.service';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';
import { ReportHelper } from './report.helper';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        ReportService,
        EasyFinanceService,
        ReportHelper,
      ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
