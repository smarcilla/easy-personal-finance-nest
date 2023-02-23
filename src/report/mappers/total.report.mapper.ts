import { BalanceReportEntity } from 'easy-personal-finance/lib/reports';
import { TotalReportDto } from '../dtos/total.report.dto';
import { BalanceReportMapper } from './balance.report.mapper';
import { TotalByReportMapper } from './total.by.report.mapper';

export class TotalReportMapper {
  map(data: {
    balanceReport: BalanceReportEntity;
    expensesGroupByConcept: Map<string, number>;
    expensesGroupByMovement: Map<string, number>;
    expensesGroupByNotes: Map<string, number>;
    incomesGroupByConcept: Map<string, number>;
    incomesGroupByMovement: Map<string, number>;
    incomesGroupByNotes: Map<string, number>;
  }): TotalReportDto {
    return {
      balance: new BalanceReportMapper().map(data.balanceReport),
      incomesByConcept: new TotalByReportMapper().map(
        data.incomesGroupByConcept,
      ),
      incomesByMovement: new TotalByReportMapper().map(
        data.incomesGroupByMovement,
      ),
      incomesByNotes: new TotalByReportMapper().map(data.incomesGroupByNotes),
      expensesByConcept: new TotalByReportMapper().map(
        data.expensesGroupByConcept,
      ),
      expensesByMovement: new TotalByReportMapper().map(
        data.expensesGroupByMovement,
      ),
      expensesByNotes: new TotalByReportMapper().map(data.expensesGroupByNotes),
    };
  }
}
