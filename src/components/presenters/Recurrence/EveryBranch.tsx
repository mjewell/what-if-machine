import * as moment from 'moment';
import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import { IEnding, IEveryRecurrenceData, IOnEndingData } from '../../../models';
import Ending from './Ending';
import OnBranch from './OnBranch';

type IProps = {
  value: IEveryRecurrenceData;
  onChange(val: IEveryRecurrenceData): void;
};

export default class EveryBranch extends React.Component<IProps, {}> {
  setCount = (e: any) => {
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

  setStartDate = (startDate: IOnEndingData) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      startDate
    });
  };

  setEnding = (ending: IEnding) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      ending
    });
  };

  render() {
    const { count, period, startDate, ending } = this.props.value;
    const nextDay = startDate && moment(startDate).add(1, 'day');

    return (
      <FormGroup className="ml-2">
        <FormControl
          style={{ width: 100 }}
          type="number"
          min="1"
          placeholder="number"
          onChange={this.setCount}
          value={count}
        />
        <FormControl
          componentClass="select"
          onChange={this.setPeriod}
          value={period}
          className="mx-2"
        >
          <option value="days">days...</option>
          <option value="weeks">weeks...</option>
          <option value="months">months...</option>
          <option value="years">years...</option>
        </FormControl>
        starting on
        <OnBranch value={startDate} onChange={this.setStartDate} />
        <Ending
          value={ending}
          onChange={this.setEnding}
          minDate={nextDay && nextDay.toDate()}
        />
      </FormGroup>
    );
  }
}
