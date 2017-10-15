import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import { arrayMove } from 'react-sortable-hoc';

import { ITransaction } from '../../models';
import { ITransactionsStore } from '../../stores';
import Transaction from '../Transaction';
import Row from './Row';
import Rows from './Rows';

export type IProps = {
  removeTransaction: (index: number) => () => void;
  addTransaction: () => void;
  transactions: ITransaction[];
  onSortEnd: (
    {
      oldIndex,
      newIndex
    }: {
      oldIndex: number;
      newIndex: number;
    }
  ) => void;
};

export default function Transactions({
  transactions,
  addTransaction,
  removeTransaction,
  onSortEnd
}: IProps) {
  return (
    <div>
      <Rows
        transactions={transactions}
        removeTransaction={removeTransaction}
        useDragHandle
        onSortEnd={onSortEnd}
      />
      <Button bsStyle="success" onClick={addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
}
