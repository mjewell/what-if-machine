import { observer } from 'mobx-react';
import * as React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { IRecurrence, ITransaction } from '../../models';
import Recurrence from '../Recurrence';

export type IProps = {
  amountStr: string;
  name: string;
  recurrence: IRecurrence;
  setAmount: (e: any) => void;
  setName: (e: any) => void;
  setRecurrence: (r: IRecurrence) => void;
};

export default function Transaction({
  amountStr,
  name,
  recurrence,
  setAmount,
  setName,
  setRecurrence
}: IProps) {
  return (
    <FormGroup>
      <InputGroup className="mr-2">
        <InputGroup.Addon>$</InputGroup.Addon>
        <FormControl
          style={{ width: 130 }}
          type="number"
          placeholder="amount"
          value={amountStr}
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
      <Recurrence value={recurrence as IRecurrence} onChange={setRecurrence} />
    </FormGroup>
  );
}
