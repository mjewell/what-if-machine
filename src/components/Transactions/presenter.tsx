import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ITransaction, ITransactionsStore } from '../../stores';
import Transaction from '../Transaction';

type IProps = {
  removeTransaction: (index: number) => () => void;
  addTransaction: ITransactionsStore['addTransaction'];
  transactions: ITransactionsStore['transactions'];
};

export default class Transactions extends React.Component<IProps, {}> {
  mapTransactionsToLines = (transactions: ITransaction[]) => {
    const { removeTransaction } = this.props;

    return transactions.map((t, index) => (
      <Form inline className="p-3" key={t.id as string}>
        <Transaction transaction={t} />
        <Button
          bsStyle="danger"
          className="ml-3"
          onClick={removeTransaction(index)}
        >
          Delete
        </Button>
      </Form>
    ));
  };

  render() {
    const { transactions, addTransaction } = this.props;
    return (
      <div>
        {this.mapTransactionsToLines(transactions)}
        <Button bsStyle="success" onClick={addTransaction}>
          Add Another Transaction
        </Button>
      </div>
    );
  }
}
