import 'react-dates/lib/css/_datepicker.css';

import * as moment from 'moment';
import * as React from 'react';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends React.Component<{}, {}> {
  state = { focused: false, date: null };

  setFocused = ({ focused }: { focused: boolean }) =>
    this.setState({ focused });

  setDate = (date: moment.Moment | null) => this.setState({ date });

  render() {
    const { focused, date } = this.state;
    return (
      <SingleDatePicker
        id="1"
        date={date}
        onDateChange={this.setDate}
        focused={focused}
        onFocusChange={this.setFocused}
        numberOfMonths={1}
      />
    );
  }
}
