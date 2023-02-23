import { BalanceReportDto } from './balance.report.dto';
import { TotalByReportDto } from './total.by.report.dto';

export class TotalReportDto {
  balance: BalanceReportDto;
  expensesByConcept: TotalByReportDto[];
  expensesByMovement: TotalByReportDto[];
  expensesByNotes: TotalByReportDto[];
  incomesByConcept: TotalByReportDto[];
  incomesByMovement: TotalByReportDto[];
  incomesByNotes: TotalByReportDto[];
}
