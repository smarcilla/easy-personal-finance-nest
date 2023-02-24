import {
  CacheKey,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileData } from 'easy-personal-finance/lib/types/transactions.type';
import { TRANSACTION_FIND_CACHE_KEY } from '../common/constants';
import { TransactionFilePipe } from './files.pipe';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  @CacheKey(TRANSACTION_FIND_CACHE_KEY)
  find() {
    return this.service.find();
  }

  @Post('import')
  @UseInterceptors(AnyFilesInterceptor())
  importTransactions(
    @UploadedFiles(TransactionFilePipe) files: Array<FileData>,
  ) {
    this.service.importTransactions(files);
  }
}
