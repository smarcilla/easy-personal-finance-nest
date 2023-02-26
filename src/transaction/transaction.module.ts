import { Module } from '@nestjs/common';
import { EasyFinanceModule } from '../easy-finance/easy-finance.module';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { FinanceStoreModule } from 'src/finance-store/finance-store.module';

@Module({
  imports: [EasyFinanceModule, FinanceStoreModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
