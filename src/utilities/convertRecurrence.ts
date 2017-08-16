import * as later from 'later';
import * as moment from 'moment';

import { IEveryRecurrenceData, IRecurrence } from '../stores/types/recurrence';
import { IPeriod } from '../types/recurrence';
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
  startDate: Date
) {
  const date = moment(startDate);

  if (period === 'days') {
    return laterPartial;
  }

  if (period === 'weeks') {
    return laterPartial.on(date.day() + 1).dayOfWeek();
  }

  const dayOfMonth = date.date();

  if (period === 'months') {
    if (dayOfMonth > 28) {
      return laterPartial.last().dayOfMonth();
    }

    return laterPartial.on(dayOfMonth).dayOfMonth();
  }

  const withMonth = laterPartial.on(date.month() + 1).month();

  if (dayOfMonth > 28) {
    return withMonth.last().dayOfMonth();
  }

  return withMonth.on(dayOfMonth).dayOfMonth();
}

export const toLater = (recurrence: IRecurrence): ISchedule | null => {
  if (recurrence.type === 'on') {
    if (!recurrence.data) {
      return null;
    }

    return {
      type: 'on',
      schedule: later.parse
        .recur()
        .on(moment(recurrence.data as Date).startOf('day').toDate())
        .fullDate()
    };
  }

  const {
    count,
    period,
    startDate,
    ending
  } = recurrence.data as IEveryRecurrenceData;

  if (count && period && startDate) {
    const partial = later.parse.recur().every(+count);
    const withPeriod = partial[periodMap[period]]();
    return {
      type: 'every',
      schedule: setDateConstraints(withPeriod, period as IPeriod, startDate),
      startDate,
      ending
    } as ISchedule;
  }

  return null;
};
