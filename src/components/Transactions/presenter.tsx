import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../models';
import { ITransactionsStore } from '../../stores';
import Transaction from '../Transaction';
import Row from './Row';
import Rows from './Rows';

export type IProps = {
  removeTransaction: (index: number) => () => void;
  addTransaction: () => void;
  transactions: ITransaction[];
};

export default function Transactions({
  transactions,
  addTransaction,
  removeTransaction
}: IProps) {
  return (
    <div className="mb-3">
      <Rows transactions={transactions} removeTransaction={removeTransaction} />
      <Button bsStyle="success" onClick={addTransaction}>
        Add Transaction
      </Button>
    </div>
  );
}
