import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'easy-personal-finance/lib/transactions';
import { FileData } from 'easy-personal-finance/lib/types/transactions.type';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';

@Injectable()
export class TransactionService {
  private transactions: TransactionEntity[] = [];
  constructor(private easyFinanceService: EasyFinanceService) {}

  find() {
    return this.transactions;
  }

  importTransactions(data: Array<FileData>) {
    this.transactions = [
      ...this.transactions,
      ...this.easyFinanceService
        .getTransactions()
        .withType('files-data')
        .withData(data)
        .build()
        .find(),
    ];
  }
}
