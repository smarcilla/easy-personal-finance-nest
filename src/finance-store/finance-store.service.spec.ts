import { Test, TestingModule } from '@nestjs/testing';
import { FinanceStoreService } from './finance-store.service';
import { TransactionStoreRepository } from './transaction-store.repository';

const mockFind = jest.fn();
const mockSave = jest.fn();
const mockRemove = jest.fn();

const mockTransactionStoreRepository = {
  find: mockFind,
  save: mockSave,
  remove: mockRemove,
};

jest.mock('./transaction-store.repository', () => ({
  TransactionStoreRepository: jest
    .fn()
    .mockImplementation(() => mockTransactionStoreRepository),
}));

describe('FinanceStoreService', () => {
  let service: FinanceStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceStoreService, TransactionStoreRepository],
    }).compile();

    service = module.get<FinanceStoreService>(FinanceStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
