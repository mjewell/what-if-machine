import * as moment from 'moment';
import * as React from 'react';
import { FormGroup } from 'react-bootstrap';

import DatePicker from '../DatePicker';

export type IValue = moment.Moment | null;

type IProps = {
  minDate?: IValue;
  value: IValue;
  onChange(date: IValue): void;
};

export default class OnBranch extends React.Component<IProps, {}> {
  render() {
    const { minDate, onChange, value } = this.props;
    return (
      <FormGroup className="ml-2">
        <DatePicker date={value} onDateChange={onChange} minDate={minDate} />
      </FormGroup>
    );
  }
}
