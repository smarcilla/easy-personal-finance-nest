import { TransactionEntity } from 'easy-personal-finance/lib/transactions';

export interface TransactionQueryResult {
  total: number;
  page: number;
  perPage: number;
  results: TransactionEntity[];
}
