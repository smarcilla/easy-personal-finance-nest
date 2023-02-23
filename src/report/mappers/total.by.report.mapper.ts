import { TotalByReportDto } from '../dtos/total.by.report.dto';

export class TotalByReportMapper {
  map(data: Map<string, number>): TotalByReportDto[] {
    const result: TotalByReportDto[] = [];
    data.forEach((value, key) => {
      result.push({ description: key, amount: value });
    });
    return result;
  }
}
