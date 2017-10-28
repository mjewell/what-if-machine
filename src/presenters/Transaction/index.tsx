import * as React from 'react';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { IRecurrence, ITransaction } from '../../models';
import Recurrence from '../Recurrence';
import transactionToProps from './transactionToProps';

export type IProps = {
  transaction: ITransaction;
};

export default function Transaction({ transaction }: IProps) {
  const {
    amount,
    name,
    recurrence,
    setAmount,
    setName,
    setRecurrence
  } = transactionToProps(transaction);

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
}
