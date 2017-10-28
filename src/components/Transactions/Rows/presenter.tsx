import * as React from 'react';

import { ICategory } from '../../../models';
import TransactionRow from '../../../presenters/TransactionRow';

export type IProps = {
  category: ICategory;
  removeTransaction: (index: number) => () => void;
};

export default function Rows({ category, removeTransaction }: IProps) {
  return (
    <div>
      {category.transactions.map((t, index) => (
        <TransactionRow
          key={t.id as string}
          transaction={t}
          removeTransaction={removeTransaction(index)}
        />
      ))}
    </div>
  );
}
