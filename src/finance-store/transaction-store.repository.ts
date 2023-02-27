import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  TransactionEntity,
  TransactionEntityFilter,
  UniqueEntityArray,
} from 'easy-personal-finance/lib/transactions';
import { TransactionQuery } from 'src/transaction/transaction.query';
import { TransactionQueryResult } from 'src/transaction/transaction.query.result';
import { TRANSACTION_FIND_CACHE_KEY } from './finance-store.constant';
import { TransactionSorter } from './transaction.sorter';

@Injectable()
export class TransactionStoreRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private getEmptyResult() {
    return {
      page: 1,
      perPage: 20,
      total: 0,
      results: [],
    };
  }

  private convertTransactions(transactions: unknown) {
    return (transactions as TransactionEntity[]).map((tran) => ({
      ...tran,
      amount: +tran.amount,
      date: new Date(tran.date),
    }));
  }

  private searchTransactions(
    transactions: TransactionEntity[],
    searchText: string,
  ) {
    return transactions.filter((transaction) => {
      try {
        return new TransactionEntityFilter().filter(transaction, searchText);
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }

  private sortResult(transactions: TransactionEntity[], sortCriteria: string) {
    return new TransactionSorter().sort(transactions, sortCriteria);
  }

  private paginateResult(queryResult) {
    const startIndex = (queryResult.page - 1) * queryResult.perPage;
    const endIndex = startIndex + queryResult.perPage;

    return {
      ...queryResult,
      results: queryResult.results.slice(startIndex, endIndex),
      total: queryResult.results.length,
    };
  }

  async find(query?: TransactionQuery): Promise<TransactionQueryResult> {
    const transactions = await this.cacheManager.get(
      TRANSACTION_FIND_CACHE_KEY,
    );

    if (!transactions) {
      return this.getEmptyResult();
    }

    const results = this.convertTransactions(transactions);

    const queryResult: TransactionQueryResult = {
      total: results.length,
      page: query.page,
      perPage: query.perPage,
      results,
    };

    if (!query) {
      return queryResult;
    }

    //Filter
    if (query.searchText) {
      queryResult.results = this.searchTransactions(
        queryResult.results,
        query.searchText,
      );
    }

    const sortedResults = this.sortResult(queryResult.results, query.sort);

    return this.paginateResult({ ...queryResult, results: sortedResults });
  }
  async save(transactionsDraft: TransactionEntity[]) {
    const { results: persistedTransactions } = await this.find();

    const transactions = new UniqueEntityArray([
      ...persistedTransactions,
      ...transactionsDraft,
    ]).items;

    this.cacheManager.set(TRANSACTION_FIND_CACHE_KEY, transactions);
  }

  async remove(transactionsDraft: TransactionEntity[]) {
    const { results: persistedTransactions } = await this.find();

    const savedTransactions = persistedTransactions.filter(
      (persistedTransaction) =>
        !transactionsDraft.find(
          (transaction) => transaction.id === persistedTransaction.id,
        ),
    );

    this.cacheManager.set(TRANSACTION_FIND_CACHE_KEY, savedTransactions);
  }
}
