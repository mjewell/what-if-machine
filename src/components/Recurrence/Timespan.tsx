import * as moment from 'moment';
import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import DatePicker from '../DatePicker';

export type IValue = {
  startDate: Date | moment.Moment | null;
  type: 'never' | 'on' | 'after';
};

type IProps = {
  value: IValue;
  onChange(val: IValue): void;
};

export default class Timespan extends React.Component<IProps, {}> {
  setStartDate = (date: moment.Moment | null) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      startDate: date
    });
  };

  setType = (e: any) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      type: e.target.value
    });
  };

  render() {
    const { startDate, type } = this.props.value;

    return (
      <FormGroup>
        starting on
        <FormGroup className="mx-2">
          <DatePicker date={startDate} onDateChange={this.setStartDate} />
        </FormGroup>
        and ending
        <FormControl
          componentClass="select"
          onChange={this.setType}
          value={type}
          className="mx-2"
        >
          <option value="never">never</option>
          <option value="on">on...</option>
          <option value="after">after...</option>
        </FormControl>
      </FormGroup>
    );
  }
}
