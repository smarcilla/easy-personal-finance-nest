import { Module } from '@nestjs/common';
import { FinanceStoreService } from './finance-store.service';
import { TransactionStoreRepository } from './transaction-store.repository';

@Module({
  providers: [FinanceStoreService, TransactionStoreRepository],
  exports: [FinanceStoreService],
})
export class FinanceStoreModule {}
