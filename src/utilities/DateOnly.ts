import * as moment from 'moment';

function getMoment(date: Date | string | number | DateOnly) {
  const dateData = date instanceof DateOnly ? date.dateTime : date;
  return moment(dateData);
}

export class DateOnly {
  dateTime: Date;

  constructor(date: Date | string | number | DateOnly) {
    this.dateTime = getMoment(date)
      .startOf('day')
      .toDate();
  }

  isEqual(date: Date | string | number | DateOnly) {
    return getMoment(date)
      .startOf('day')
      .isSame(this.dateTime);
  }

  getTime() {
    return this.dateTime.getTime();
  }
}
