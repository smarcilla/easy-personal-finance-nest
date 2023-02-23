import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BalanceReportEntity } from 'easy-personal-finance/lib/reports';
import { TotalReportDto } from '../dtos/total.report.dto';
import { BalanceReportPipe } from './balance.report.pipe';
import { TotalByReportPipe } from './total.by.report.pipe';

@Injectable()
export class TotalReportPipe
  implements
    PipeTransform<
      {
        balanceReport: BalanceReportEntity;
        expensesGroupByConcept: Map<string, number>;
        expensesGroupByMovement: Map<string, number>;
        expensesGroupByNotes: Map<string, number>;
        incomesGroupByConcept: Map<string, number>;
        incomesGroupByMovement: Map<string, number>;
        incomesGroupByNotes: Map<string, number>;
      },
      TotalReportDto
    >
{
  transform(
    value: {
      balanceReport: BalanceReportEntity;
      expensesGroupByConcept: Map<string, number>;
      expensesGroupByMovement: Map<string, number>;
      expensesGroupByNotes: Map<string, number>;
      incomesGroupByConcept: Map<string, number>;
      incomesGroupByMovement: Map<string, number>;
      incomesGroupByNotes: Map<string, number>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ): TotalReportDto {
    return {
      balance: new BalanceReportPipe().transform(
        value.balanceReport,
        _metadata,
      ),
      incomesByConcept: new TotalByReportPipe().transform(
        value.incomesGroupByConcept,
        _metadata,
      ),
      incomesByMovement: new TotalByReportPipe().transform(
        value.incomesGroupByMovement,
        _metadata,
      ),
      incomesByNotes: new TotalByReportPipe().transform(
        value.incomesGroupByNotes,
        _metadata,
      ),
      expensesByConcept: new TotalByReportPipe().transform(
        value.expensesGroupByConcept,
        _metadata,
      ),
      expensesByMovement: new TotalByReportPipe().transform(
        value.expensesGroupByMovement,
        _metadata,
      ),
      expensesByNotes: new TotalByReportPipe().transform(
        value.expensesGroupByNotes,
        _metadata,
      ),
    };
  }
}
