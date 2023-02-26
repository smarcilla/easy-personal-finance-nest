import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'easy-personal-finance/lib/transactions';
import { TransactionStoreRepository } from './transaction-store.repository';

@Injectable()
export class FinanceStoreService {
  constructor(private transactionRepository: TransactionStoreRepository) {}

  async findTransactions() {
    return this.transactionRepository.find();
  }

  async importTransactions(transactionsDraft: TransactionEntity[]) {
    return this.transactionRepository.save(transactionsDraft);
  }

  async removeTransactions() {
    return this.transactionRepository.remove(await this.findTransactions());
  }
}
