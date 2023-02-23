import { Module } from '@nestjs/common';
import { EasyFinanceModule } from '../easy-finance/easy-finance.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [EasyFinanceModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
