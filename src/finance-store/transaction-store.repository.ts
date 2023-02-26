import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  TransactionEntity,
  UniqueEntityArray,
} from 'easy-personal-finance/lib/transactions';
import { TRANSACTION_FIND_CACHE_KEY } from './finance-store.constant';

@Injectable()
export class TransactionStoreRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async find() {
    const transactions = await this.cacheManager.get(
      TRANSACTION_FIND_CACHE_KEY,
    );

    return transactions ? (transactions as TransactionEntity[]) : [];
  }
  async save(transactionsDraft: TransactionEntity[]) {
    const persistedTransactions = await this.find();

    const transactions = new UniqueEntityArray([
      ...persistedTransactions,
      ...transactionsDraft,
    ]).items;

    this.cacheManager.set(TRANSACTION_FIND_CACHE_KEY, transactions);
  }

  async getById(id: string) {
    const persistedTransactions = await this.find();

    return persistedTransactions.find((transaction) => transaction.id === id);
  }

  async remove(transactionsDraft: TransactionEntity[]) {
    const persistedTransactions = await this.find();

    const savedTransactions = persistedTransactions.filter(
      (persistedTransaction) =>
        !transactionsDraft.find(
          (transaction) => transaction.id === persistedTransaction.id,
        ),
    );

    this.cacheManager.set(TRANSACTION_FIND_CACHE_KEY, savedTransactions);
  }
}
