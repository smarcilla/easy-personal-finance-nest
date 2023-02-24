import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyFinanceModule } from './easy-finance/easy-finance.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    EasyFinanceModule,
    TransactionModule,
    ReportModule,
    CacheModule.register({ ttl: 60 * 1000, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_INTERCEPTOR', useClass: CacheInterceptor },
  ],
})
export class AppModule {}
