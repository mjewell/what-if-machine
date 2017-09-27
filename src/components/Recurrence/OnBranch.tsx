import * as React from 'react';
import { FormGroup } from 'react-bootstrap';

import { IOnEndingData } from '../../stores';
import DatePicker from '../DatePicker';

type IProps = {
  minDate?: Date | null;
  value: IOnEndingData;
  onChange(date: IOnEndingData): void;
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
