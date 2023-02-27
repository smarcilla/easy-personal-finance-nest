import { TransactionEntity } from 'easy-personal-finance/lib/transactions';

type OrderType = 'ASC' | 'DESC';

const sortDate = (date1: Date, date2: Date, order: OrderType) => {
  if (date1 > date2) {
    return order === 'ASC' ? -1 : 1;
  }

  if (date2 > date1) {
    return order === 'ASC' ? 1 : -1;
  }

  return 0;
};

const sortText = (text1: string, text2: string, order: OrderType) => {
  if (text1 < text2) {
    return order === 'ASC' ? -1 : 1;
  }

  if (text2 < text1) {
    return order === 'ASC' ? 1 : -1;
  }

  return 0;
};

const sortNumber = (number1: number, number2: number, order: OrderType) => {
  return order === 'ASC' ? number1 - number2 : number2 - number1;
};

const sortField =
  (field, order: OrderType) =>
  (tran1: TransactionEntity, tran2: TransactionEntity) => {
    if (tran1[field] instanceof Date) {
      return sortDate(tran1[field], tran2[field], order);
    }

    if (typeof tran1[field] == 'number') {
      return sortNumber(tran1[field], tran2[field], order);
    }

    return sortText(tran1[field], tran2[field], order);
  };

export class TransactionSorter {
  sort(transactions: TransactionEntity[], sortCriteria: string) {
    const [field, order] = sortCriteria.split(':');

    return transactions.sort(
      sortField(field, order.toUpperCase() as 'ASC' | 'DESC'),
    );
  }
}
