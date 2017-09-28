import * as moment from 'moment';

type DateOnlyConstructable = Date | string | number | DateOnly | moment.Moment;

function getMoment(date?: DateOnlyConstructable) {
  const dateData = date instanceof DateOnly ? date.dateTime : date;
  return moment(dateData);
}

export class DateOnly {
  dateTime: Date;

  constructor(date?: DateOnlyConstructable) {
    this.dateTime = getMoment(date)
      .startOf('day')
      .toDate();
  }

  isEqual(date: DateOnlyConstructable) {
    return getMoment(date)
      .startOf('day')
      .isSame(this.dateTime);
  }

  getTime() {
    return this.dateTime.getTime();
  }
}
