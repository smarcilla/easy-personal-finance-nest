import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  TransactionEntity,
  UniqueEntityArray,
} from 'easy-personal-finance/lib/transactions';
import { FileData } from 'easy-personal-finance/lib/types/transactions.type';
import { TRANSACTION_FIND_CACHE_KEY } from '../common/constants';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';

@Injectable()
export class TransactionService {
  constructor(
    private easyFinanceService: EasyFinanceService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async find() {
    const transactions = await this.cacheManager.get(
      TRANSACTION_FIND_CACHE_KEY,
    );

    return transactions ? (transactions as TransactionEntity[]) : [];
  }

  async importTransactions(data: Array<FileData>) {
    const persistedTransactions = await this.find();

    const newTransactions = this.easyFinanceService
      .getTransactions()
      .withType('files-data')
      .withData(data)
      .build()
      .find();

    const transactions = new UniqueEntityArray([
      ...persistedTransactions,
      ...newTransactions,
    ]).items;

    await this.cacheManager.reset();

    //TODO: https://redis.io/docs/management/persistence/
    this.cacheManager.set(TRANSACTION_FIND_CACHE_KEY, transactions);
  }
}
