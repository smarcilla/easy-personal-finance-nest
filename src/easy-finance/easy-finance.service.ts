import { Injectable } from '@nestjs/common';
import EasyFinance from 'easy-personal-finance';

@Injectable()
export class EasyFinanceService {
  constructor(private easyFinance: EasyFinance) {}
  getTransactions() {
    return this.easyFinance.transactions;
  }

  getReports() {
    return this.easyFinance.reports;
  }
}
