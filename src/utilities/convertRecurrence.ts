import * as later from 'later';
import * as moment from 'moment';

import { IPeriod, IRecurrence } from '../types/recurrence';
import { ISchedule } from '../types/schedule';

const periodMap = {
  days: 'dayOfYear',
  weeks: 'weekOfYear',
  months: 'month',
  years: 'year'
};

function setDateConstraints(
  laterPartial: later.RecurrenceBuilder,
  period: IPeriod,
  startDate: moment.Moment
) {
  if (period === 'days') {
    return laterPartial;
  }

  if (period === 'weeks') {
    return laterPartial.on(startDate.day() + 1).dayOfWeek();
  }

  const dayOfMonth = startDate.date();

  if (period === 'months') {
    if (dayOfMonth > 28) {
      return laterPartial.last().dayOfMonth();
    }

    return laterPartial.on(dayOfMonth).dayOfMonth();
  }

  const withMonth = laterPartial.on(startDate.month() + 1).month();

  if (dayOfMonth > 28) {
    return withMonth.last().dayOfMonth();
  }

  return withMonth.on(dayOfMonth).dayOfMonth();
}

export const toLater = (recurrence: IRecurrence): ISchedule | null => {
  if (recurrence.type === 'on') {
    if (recurrence.data) {
      return {
        type: 'on',
        schedule: later.parse
          .recur()
          .on(recurrence.data.startOf('day').toDate())
          .fullDate().schedules
      };
    } else {
      return null;
    }
  }

  const { count, period, startDate, ending } = recurrence.data;

  if (count && period && startDate) {
    const partial = later.parse.recur().every(+count);
    const withPeriod = partial[periodMap[period]]();
    return {
      type: 'every',
      schedule: setDateConstraints(withPeriod, period, startDate).schedules,
      startDate,
      ending
    };
  }

  return null;
};
