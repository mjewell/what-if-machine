import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../../models';
import Transaction from '../../Transaction';
import Handle from './Handle';

export type IProps = {
  removeTransaction: () => void;
  transaction: ITransaction;
};

export default function TransactionRow({
  removeTransaction,
  transaction
}: IProps) {
  return (
    <Form inline key={transaction.id as string}>
      <Handle />
      <Transaction transaction={transaction} />
      <Button bsStyle="danger" className="ml-3" onClick={removeTransaction}>
        Delete
      </Button>
    </Form>
  );
}
