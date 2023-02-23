import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TotalByReportDto } from '../dtos/total.by.report.dto';

@Injectable()
export class TotalByReportPipe
  implements PipeTransform<Map<string, number>, TotalByReportDto[]>
{
  transform(
    value: Map<string, number>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ): TotalByReportDto[] {
    const result: TotalByReportDto[] = [];
    value.forEach((value, key) => {
      result.push({ description: key, amount: value });
    });
    return result;
  }
}
