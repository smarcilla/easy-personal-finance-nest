import { BalanceReportEntity } from 'easy-personal-finance/lib/reports';
import { BalanceReportDto } from '../dtos/balance.report.dto';

export class BalanceReportMapper {
  map(data: BalanceReportEntity): BalanceReportDto {
    return {
      incomeAmount: data.totalIncomes,
      expenseAmount: data.totalExpenses,
      balanceAmount: data.totalBalance,
    };
  }
}
