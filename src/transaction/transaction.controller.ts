import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private service: TransactionService) {}

  @Get()
  find() {
    return this.service.find();
  }
}
