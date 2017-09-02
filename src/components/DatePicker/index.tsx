import 'react-dates/lib/css/_datepicker.css';

import * as moment from 'moment';
import * as React from 'react';
import { SingleDatePicker } from 'react-dates';
import { generate } from 'shortid';

import { DateOnly } from '../../utilities/DateOnly';

export type IValue = Date | null;

type IProps = {
  minDate?: IValue;
  date: IValue;
  onDateChange(date: IValue): void;
};

export default class DatePicker extends React.Component<IProps> {
  state = { focused: false };

  setFocused = ({ focused }: { focused: boolean }) =>
    this.setState({ focused });

  isOutsideRange = (minDate?: IValue) => {
    if (!minDate) {
      return () => false;
    }

    const minDateMoment = moment(minDate).startOf('day');

    return (date: moment.Moment) => {
      return minDateMoment.isSameOrAfter(date);
    };
  };

  onDateChange = (date: moment.Moment | null) => {
    return this.props.onDateChange(date && new DateOnly(date).dateTime);
  };

  render() {
    const { focused } = this.state;
    const { minDate, date, ...props } = this.props;
    const isOutsideRange = this.isOutsideRange(minDate);

    return (
      <SingleDatePicker
        id={generate()}
        focused={focused}
        onFocusChange={this.setFocused}
        numberOfMonths={1}
        isOutsideRange={isOutsideRange}
        {...props}
        onDateChange={this.onDateChange}
        date={date && moment(date)}
      />
    );
  }
}
