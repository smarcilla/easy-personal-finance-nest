import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyFinanceModule } from './easy-finance/easy-finance.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [EasyFinanceModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
