import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../../models';
import { ITransactionsStore } from '../../../stores';
import Transaction from '../../Transaction';
import Row from '../Row';

export type IProps = {
  removeTransaction: (index: number) => () => void;
  transactions: ITransaction[];
};

export default function Rows({ transactions, removeTransaction }: IProps) {
  return (
    <div>
      {transactions.map((t, index) => (
        <Row
          key={t.id as string}
          index={index}
          transaction={t}
          removeTransaction={removeTransaction(index)}
        />
      ))}
    </div>
  );
}
