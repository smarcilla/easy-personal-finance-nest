import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ReportService } from './report.service';
import { TotalReportInterceptor } from './total.report.interceptor';

@Controller('report')
export class ReportController {
  constructor(private service: ReportService) {}

  @Get()
  @UseInterceptors(new TotalReportInterceptor())
  findAll() {
    return this.service.findAll();
  }
}
