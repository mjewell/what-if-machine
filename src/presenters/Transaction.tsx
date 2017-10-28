import { observer } from 'mobx-react';
import * as React from 'react';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { IRecurrence } from '../models';
import Recurrence from './Recurrence';

export type IProps = {
  amount: string;
  name: string;
  recurrence: IRecurrence;
  setAmount: (e: any) => void;
  setName: (e: any) => void;
  setRecurrence: (r: IRecurrence) => void;
};

export default observer(function Transaction({
  amount,
  name,
  recurrence,
  setAmount,
  setName,
  setRecurrence
}: IProps) {
  return (
    <Form inline>
      <FormGroup>
        <InputGroup className="mr-2">
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl
            style={{ width: 130 }}
            type="number"
            placeholder="amount"
            value={amount}
            onChange={setAmount}
          />
        </InputGroup>
        for
        <FormControl
          type="text"
          placeholder="name"
          className="mx-2"
          value={name}
          onChange={setName}
        />
        <Recurrence
          value={recurrence as IRecurrence}
          onChange={setRecurrence}
        />
      </FormGroup>
    </Form>
  );
});
