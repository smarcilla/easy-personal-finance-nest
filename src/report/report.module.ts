import { Module } from '@nestjs/common';
import { EasyFinanceModule } from '../easy-finance/easy-finance.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ReportController } from './report.controller';
import { ReportHelper } from './report.helper';
import { ReportService } from './report.service';

@Module({
  imports: [EasyFinanceModule, TransactionModule],
  controllers: [ReportController],
  providers: [ReportService, ReportHelper],
})
export class ReportModule {}
