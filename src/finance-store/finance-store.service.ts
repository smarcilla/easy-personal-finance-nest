import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'easy-personal-finance/lib/transactions';
import { TransactionQuery } from 'src/transaction/transaction.query';
import { TransactionStoreRepository } from './transaction-store.repository';

@Injectable()
export class FinanceStoreService {
  constructor(private transactionRepository: TransactionStoreRepository) {}

  async findTransactions(
    query: TransactionQuery = { page: 1, perPage: 20, sort: 'date:asc' },
  ) {
    return this.transactionRepository.find(query);
  }

  async importTransactions(transactionsDraft: TransactionEntity[]) {
    return this.transactionRepository.save(transactionsDraft);
  }

  async removeTransactions() {
    const { results } = await this.findTransactions();
    return this.transactionRepository.remove(results);
  }
}
