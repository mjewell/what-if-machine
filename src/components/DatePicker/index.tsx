import 'react-dates/lib/css/_datepicker.css';

import * as moment from 'moment';
import * as React from 'react';
import { SingleDatePicker } from 'react-dates';

type IProps = {
  date: Date | moment.Moment | null;
  onDateChange(date: moment.Moment | null): void;
};

export default class DatePicker extends React.Component<IProps, {}> {
  state = { focused: false };

  setFocused = ({ focused }: { focused: boolean }) =>
    this.setState({ focused });

  render() {
    const { focused } = this.state;
    return (
      <SingleDatePicker
        id="datepicker"
        focused={focused}
        onFocusChange={this.setFocused}
        numberOfMonths={1}
        {...this.props}
        date={this.props.date && moment(this.props.date)}
      />
    );
  }
}
