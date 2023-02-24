import { CacheKey, Controller, Get, UseInterceptors } from '@nestjs/common';
import { REPORT_FIND_ALL_CACHE_KEY } from '../common/constants';
import { ReportService } from './report.service';
import { TotalReportInterceptor } from './total.report.interceptor';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Get()
  @UseInterceptors(new TotalReportInterceptor())
  @CacheKey(REPORT_FIND_ALL_CACHE_KEY)
  findAll() {
    return this.service.findAll();
  }
}
