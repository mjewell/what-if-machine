import { RRule } from 'rrule';

import { IEveryRecurrenceData, IRecurrence } from '../stores/types/recurrence';

const periodMap = {
  days: 'DAILY',
  weeks: 'WEEKLY',
  months: 'MONTHLY',
  years: 'YEARLY'
};

export const toRRule = (recurrence: IRecurrence): RRule | null => {
  if (recurrence.type === 'on') {
    if (!recurrence.data) {
      return null;
    }

    return new RRule({
      freq: RRule.DAILY,
      dtstart: new Date(recurrence.data as Date),
      count: 1
    });
  }

  const {
    count,
    period,
    startDate,
    ending
  } = recurrence.data as IEveryRecurrenceData;

  if (count && period && startDate) {
    const { type, data: endingData } = ending;

    const sharedOptions = {
      freq: RRule[periodMap[period]],
      dtstart: new Date(startDate),
      interval: +count
    };

    if (type === 'never') {
      return new RRule(sharedOptions);
    }

    if (!endingData) {
      return null;
    }

    if (type === 'on') {
      return new RRule({
        ...sharedOptions,
        until: new Date(endingData as Date)
      });
    }

    if (type === 'after') {
      return new RRule({
        ...sharedOptions,
        count: +endingData
      });
    }
  }

  return null;
};
