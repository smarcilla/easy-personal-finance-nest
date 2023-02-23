import { Injectable } from '@nestjs/common';
import {
  BalanceSheetService,
  IncomeService,
  ExpenseService,
} from 'easy-personal-finance/lib/reports';
import { TransactionEntity } from 'easy-personal-finance/lib/transactions';
import { EasyFinanceService } from '../easy-finance/easy-finance.service';

@Injectable()
export class ReportHelper {
  constructor(private easyFinanceService: EasyFinanceService) {}

  getBalanceSheetService(
    transactions: TransactionEntity[],
  ): BalanceSheetService {
    const service: unknown = this.easyFinanceService
      .getReports()
      .withType('balance')
      .withData(transactions)
      .build();

    return service as BalanceSheetService;
  }

  getIncomeService(transactions: TransactionEntity[]): IncomeService {
    const service: unknown = this.easyFinanceService
      .getReports()
      .withType('income')
      .withData(transactions)
      .build();

    return service as IncomeService;
  }

  getExpenseService(transactions: TransactionEntity[]): ExpenseService {
    const service: unknown = this.easyFinanceService
      .getReports()
      .withType('expense')
      .withData(transactions)
      .build();

    return service as ExpenseService;
  }
}
