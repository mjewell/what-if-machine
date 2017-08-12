import * as React from 'react';
import { Form } from 'react-bootstrap';

import Transaction from '../Transaction';

export default class Transactions extends React.Component<{}, {}> {
  render() {
    return (
      <Form inline className="p-3">
        <Transaction />
      </Form>
    );
  }
}
