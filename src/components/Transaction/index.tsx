import * as React from 'react';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import Recurrence from '../Recurrence';

export default class Transaction extends React.Component<{}, {}> {
  render() {
    return (
      <FormGroup>
        <InputGroup className="mr-2">
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl type="text" placeholder="amount" />
        </InputGroup>
        for
        <FormControl type="text" placeholder="name" className="mx-2" />
        <Recurrence onChange={console.log} />
      </FormGroup>
    );
  }
}
