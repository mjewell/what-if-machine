import * as React from 'react';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import Recurrence, { IValue } from '../Recurrence';

export default class Transaction extends React.Component<{}, IValue> {
  state: IValue = {
    type: 'every',
    data: {
      period: 'days',
      count: 1,
      timespan: { startDate: null, type: 'never' }
    }
  };

  onChange = (val: any) => {
    this.setState(val);
    console.log(val);
  };

  render() {
    return (
      <FormGroup>
        <InputGroup className="mr-2">
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl type="text" placeholder="amount" />
        </InputGroup>
        for
        <FormControl type="text" placeholder="name" className="mx-2" />
        <Recurrence value={this.state} onChange={this.onChange} />
      </FormGroup>
    );
  }
}
