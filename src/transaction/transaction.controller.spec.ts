const mockFind = jest.fn();

const mockTransactionService = {
  find: mockFind,
};

jest.mock('./transaction.service', () => ({
  TransactionService: jest
    .fn()
    .mockImplementation(() => mockTransactionService),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  const transactions = [];
  let controller: TransactionController;

  beforeEach(async () => {
    mockFind.mockResolvedValue(transactions);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should return an array of transactions', async () => {
    expect(await controller.find()).toBe(transactions);
  });
});
