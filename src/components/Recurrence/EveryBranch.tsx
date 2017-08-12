import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import Timespan, { IValue as ITimespanValue } from './Timespan';

type IPeriods = 'days' | 'weeks' | 'months' | 'years';

export type IValue = {
  count: string | number;
  period: IPeriods;
  timespan: ITimespanValue;
};

type IProps = {
  value: IValue;
  onChange(val: IValue): void;
};

export default class EveryBranch extends React.Component<IProps, {}> {
  setNumber = (e: any) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      count: e.target.value
    });
  };

  setPeriod = (e: any) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      period: e.target.value
    });
  };

  setTimespan = (timespan: ITimespanValue) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      timespan
    });
  };

  render() {
    const { count, period, timespan } = this.props.value;

    let PeriodStep;

    if (period === 'days') {
      PeriodStep = null;
    }

    return (
      <FormGroup>
        <FormControl
          type="number"
          min="1"
          placeholder="number"
          onChange={this.setNumber}
          value={count}
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
        {PeriodStep}
        <Timespan value={timespan} onChange={this.setTimespan} />
      </FormGroup>
    );
  }
}
