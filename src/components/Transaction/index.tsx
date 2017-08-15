import * as later from 'later';
import * as React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { toLater } from '../../utilities/convertRecurrence';
import Recurrence, { IValue } from '../Recurrence';

export default class Transaction extends React.Component<{}, IValue> {
  state: IValue = {
    type: 'on',
    data: null
  };

  onChange = (val: any) => {
    this.setState(val);
    console.log(val);
    console.log(toLater(val));
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
