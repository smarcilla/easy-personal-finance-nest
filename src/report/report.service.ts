import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { ReportHelper } from './report.helper';

@Injectable()
export class ReportService {
  constructor(
    private transactionService: TransactionService,
    private reportHelper: ReportHelper,
  ) {}

  async findAll() {
    const transactions = await this.transactionService.find();

    const balanceReport = this.reportHelper
      .getBalanceSheetService(transactions)
      .calculateReport();

    const [
      expensesGroupByConcept,
      expensesGroupByMovement,
      expensesGroupByNotes,
    ] = ['concept', 'movement', 'notes'].map(
      (key: 'concept' | 'movement' | 'notes') =>
        this.reportHelper.getExpenseService(transactions).calculate(key),
    );

    const [incomesGroupByConcept, incomesGroupByMovement, incomesGroupByNotes] =
      ['concept', 'movement', 'notes'].map(
        (key: 'concept' | 'movement' | 'notes') =>
          this.reportHelper.getIncomeService(transactions).calculate(key),
      );

    return {
      balanceReport,
      expensesGroupByConcept: expensesGroupByConcept,
      expensesGroupByMovement: expensesGroupByMovement,
      expensesGroupByNotes: expensesGroupByNotes,
      incomesGroupByConcept: incomesGroupByConcept,
      incomesGroupByMovement: incomesGroupByMovement,
      incomesGroupByNotes: incomesGroupByNotes,
    };
  }
}
