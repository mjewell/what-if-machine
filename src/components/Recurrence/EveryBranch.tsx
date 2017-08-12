import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import DatePicker from '../DatePicker';

type IState = {
  period: 'days' | 'weeks' | 'months' | 'years';
};

type IProps = {
  onChange?(val: any): void;
};

export default class EveryBranch extends React.Component<IProps, IState> {
  state: IState = { period: 'days' };

  setPeriod = (e: any) =>
    this.setState({
      period: e.target.value
    });

  render() {
    const { period } = this.state;

    let NextStep;

    if (period === 'days') {
      NextStep = null;
    }

    return (
      <FormGroup>
        <FormControl
          type="number"
          min="1"
          placeholder="number"
          className="mr-2"
        />
        <FormControl
          componentClass="select"
          onChange={this.setPeriod}
          value={period}
          className="mr-2"
        >
          <option value="days">days...</option>
          <option value="weeks">weeks...</option>
          <option value="months">months...</option>
          <option value="years">years...</option>
        </FormControl>
        {NextStep}
      </FormGroup>
    );
  }
}
