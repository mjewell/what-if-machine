import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ITransaction } from '../../stores';
import Transaction from '../Transaction';

type IProps = {
  removeTransaction: () => void;
  transaction: ITransaction;
};

export default function TransactionRow({
  removeTransaction,
  transaction
}: IProps) {
  return (
    <Form inline className="p-3" key={transaction.id as string}>
      <Transaction transaction={transaction} />
      <Button bsStyle="danger" className="ml-3" onClick={removeTransaction}>
        Delete
      </Button>
    </Form>
  );
}
