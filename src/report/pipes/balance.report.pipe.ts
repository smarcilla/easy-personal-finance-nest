import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BalanceReportEntity } from 'easy-personal-finance/lib/reports';
import { BalanceReportDto } from '../dtos/balance.report.dto';

@Injectable()
export class BalanceReportPipe
  implements PipeTransform<BalanceReportEntity, BalanceReportDto>
{
  transform(
    value: BalanceReportEntity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ): BalanceReportDto {
    return {
      incomeAmount: value.totalIncomes,
      expenseAmount: value.totalExpenses,
      balanceAmount: value.totalBalance,
    };
  }
}
