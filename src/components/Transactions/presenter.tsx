import * as React from 'react';
import { Button, Form } from 'react-bootstrap';

import { IStore } from '../../stores/index';
import Transaction from '../Transaction';

type IProps = {
  store: IStore;
};

export default class Transactions extends React.Component<IProps, {}> {
  removeTransaction = (index: number) => () => {
    const { removeTransaction } = this.props.store.transactions;
    removeTransaction(index);
  };

  render() {
    const { transactions, addTransaction } = this.props.store.transactions;
    return (
      <div>
        {transactions.map((t, index) =>
          <Form inline className="p-3" key={t.id as string}>
            <Transaction transaction={t} />
            <Button onClick={this.removeTransaction(index)}>Delete</Button>
          </Form>
        )}
        <Button onClick={addTransaction}>Add Another Transaction</Button>
      </div>
    );
  }
}
