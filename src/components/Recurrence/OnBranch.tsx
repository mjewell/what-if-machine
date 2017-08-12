import * as moment from 'moment';
import * as React from 'react';

import DatePicker from '../DatePicker';

type IProps = {
  value: Date | moment.Moment | null;
  onChange(date: moment.Moment | null): void;
};

export default class OnBranch extends React.Component<IProps, {}> {
  render() {
    return (
      <DatePicker date={this.props.value} onDateChange={this.props.onChange} />
    );
  }
}
