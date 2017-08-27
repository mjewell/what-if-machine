import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { IStore } from '../../stores/index';
import { ITransaction } from '../../stores/transaction';
import Transaction from '../Transaction';

type IProps = {
  store: IStore;
};

export default class Transactions extends React.Component<IProps, {}> {
  removeTransaction = (index: number) => () => {
    const { removeTransaction } = this.props.store.transactions;
    removeTransaction(index);
  };

  mapTransactionsToLines = (transactions: ITransaction[]) => {
    return transactions.map((t, index) =>
      <Form inline className="p-3" key={t.id as string}>
        <Transaction transaction={t} />
        <Button
          bsStyle="danger"
          className="ml-3"
          onClick={this.removeTransaction(index)}
        >
          Delete
        </Button>
      </Form>
    );
  };

  render() {
    const { transactions, addTransaction } = this.props.store.transactions;
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
