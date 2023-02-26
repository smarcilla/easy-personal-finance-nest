import { Injectable } from '@nestjs/common';
import { FileData } from 'easy-personal-finance/lib/types/transactions.type';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';
import { FinanceStoreService } from '../finance-store/finance-store.service';

@Injectable()
export class TransactionService {
  constructor(
    private easyFinanceService: EasyFinanceService,
    private financeStoreService: FinanceStoreService,
  ) {}

  async find() {
    return this.financeStoreService.findTransactions();
  }

  async importTransactions(data: Array<FileData>) {
    const newTransactions = this.easyFinanceService
      .getTransactions()
      .withType('files-data')
      .withData(data)
      .build()
      .find();

    this.financeStoreService.importTransactions(newTransactions);
  }

  async removeAll() {
    this.financeStoreService.removeTransactions();
  }
}
