import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {
  FileData,
  FileFormatType,
} from 'easy-personal-finance/lib/types/transactions.type';

@Injectable()
export class TransactionFilePipe
  implements PipeTransform<Array<Express.Multer.File>, Array<FileData>>
{
  transform(
    value: Express.Multer.File[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _metadata: ArgumentMetadata,
  ): FileData[] {
    return value.map((data) => ({
      name: data.originalname,
      content: data.buffer,
      mimeType: data.mimetype as FileFormatType,
    }));
  }
}
