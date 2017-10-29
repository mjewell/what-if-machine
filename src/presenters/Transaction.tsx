import { observer } from 'mobx-react';
import * as React from 'react';
import { Component } from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { IRecurrence } from '../models';
import Recurrence from './Recurrence';

export type IProps = {
  transaction: {
    amount: string;
    name: string;
    recurrence: IRecurrence;
    setAmount: (amount: string) => void;
    setName: (name: string) => void;
    setRecurrence: (r: IRecurrence) => void;
  };
};

@observer
export default class Transaction extends Component<IProps, {}> {
  onAmountChange = (e: any) => {
    const { transaction } = this.props;
    transaction.setAmount(e.target.value);
  };

  onNameChange = (e: any) => {
    const { transaction } = this.props;
    transaction.setName(e.target.value);
  };

  render() {
    const { transaction } = this.props;

    return (
      <FormGroup>
        <InputGroup className="mr-2">
          <InputGroup.Addon>$</InputGroup.Addon>
          <FormControl
            style={{ width: 130 }}
            type="number"
            placeholder="amount"
            value={transaction.amount}
            onChange={this.onAmountChange}
          />
        </InputGroup>
        for
        <FormControl
          type="text"
          placeholder="name"
          className="mx-2"
          value={transaction.name}
          onChange={this.onNameChange}
        />
        <Recurrence
          value={transaction.recurrence as IRecurrence}
          onChange={transaction.setRecurrence}
        />
      </FormGroup>
    );
  }
}
