import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';

import { ITransaction } from '../../../models';
import Row from '../Row';

export type IProps = {
  transactions: ITransaction[];
  removeTransaction: (index: number) => () => void;
};

export default function Transactions({
  transactions,
  removeTransaction
}: IProps) {
  return (
    <div>
      {transactions.map((t, index) => (
        <Row
          key={t.id as string}
          transaction={t}
          removeTransaction={removeTransaction(index)}
        />
      ))}
    </div>
  );
}
