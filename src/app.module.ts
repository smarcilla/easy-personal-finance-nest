import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyFinanceModule } from './easy-finance/easy-finance.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReportModule } from './report/report.module';
import { FinanceStoreModule } from './finance-store/finance-store.module';

@Module({
  imports: [
    EasyFinanceModule,
    TransactionModule,
    ReportModule,
    CacheModule.register({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // https://github.com/dabroek/node-cache-manager-redis-store/issues/40#issuecomment-1285462192
      store: async () => {
        return await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
      },
    }),
    FinanceStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
