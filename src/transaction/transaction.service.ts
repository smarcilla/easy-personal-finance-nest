import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'easy-personal-finance/lib/transactions';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';

@Injectable()
export class TransactionService {
  private transactions: TransactionEntity[] = [];
  constructor(private easyFinanceService: EasyFinanceService) {}

  find() {
    return this.transactions;
  }
}
