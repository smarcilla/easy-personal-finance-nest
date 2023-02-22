import { Module } from '@nestjs/common';
import EasyFinance from 'easy-personal-finance';
import { EasyFinanceService } from './easy-finance.service';

@Module({
  providers: [
    EasyFinanceService,
    { provide: EasyFinance, useClass: EasyFinance },
  ],
  exports: [EasyFinanceService],
})
export class EasyFinanceModule {}
