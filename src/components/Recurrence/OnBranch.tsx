import * as moment from 'moment';
import * as React from 'react';

import DatePicker from '../DatePicker';

export type IValue = Date | moment.Moment | null;

type IProps = {
  value: IValue;
  onChange(date: moment.Moment | null): void;
};

export default class OnBranch extends React.Component<IProps, {}> {
  render() {
    return (
      <DatePicker date={this.props.value} onDateChange={this.props.onChange} />
    );
  }
}
