import { observer } from 'mobx-react';
import * as React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import { ITransaction } from '../../stores/transaction';
import { IRecurrence } from '../../types/recurrence';
import Recurrence from '../Recurrence';

type IProps = {
  transaction: ITransaction;
};

export default observer(
  class Transaction extends React.Component<IProps> {
    setName = (e: any) => {
      this.props.transaction.setName(e.target.value);
    };

    setAmount = (e: any) => {
      this.props.transaction.setAmount(e.target.value);
    };

    render() {
      const {
        name,
        amountStr,
        recurrence,
        setRecurrence
      } = this.props.transaction;
      return (
        <FormGroup>
          <InputGroup className="mr-2">
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormControl
              style={{ width: 130 }}
              type="number"
              placeholder="amount"
              value={amountStr}
              onChange={this.setAmount}
            />
          </InputGroup>
          for
          <FormControl
            type="text"
            placeholder="name"
            className="mx-2"
            value={name}
            onChange={this.setName}
          />
          <Recurrence
            value={recurrence as IRecurrence}
            onChange={setRecurrence}
          />
        </FormGroup>
      );
    }
  }
);
