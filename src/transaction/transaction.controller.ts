import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileData } from 'easy-personal-finance/lib/types/transactions.type';
import { TransactionFilePipe } from './files.pipe';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  find(
    @Query('searchText') searchText?: string,
    @Query('sort') sort = 'date:asc',
    @Query('page', ParseIntPipe) page = 1,
    @Query('perPage', ParseIntPipe) perPage = 20,
  ) {
    return this.service.find({ searchText, sort, page, perPage });
  }

  @Post('import')
  @UseInterceptors(AnyFilesInterceptor())
  importTransactions(
    @UploadedFiles(TransactionFilePipe) files: Array<FileData>,
  ) {
    this.service.importTransactions(files);
  }

  @Delete()
  removeAll() {
    this.service.removeAll();
  }
}
