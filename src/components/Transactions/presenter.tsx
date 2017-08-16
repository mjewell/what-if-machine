import * as React from 'react';
import { Form } from 'react-bootstrap';

import { IStore } from '../../stores/index';
import Transaction from '../Transaction';

type IProps = {
  store: IStore;
};

export default class Transactions extends React.Component<IProps, {}> {
  render() {
    const { transactions } = this.props.store.transactions;
    return (
      <div>
        {transactions.map(t =>
          <Form inline className="p-3" key={t.id as string}>
            <Transaction transaction={t} />
          </Form>
        )}
      </div>
    );
  }
}
