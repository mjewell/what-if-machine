import 'twix';

import * as later from 'later';
import { getSnapshot, types } from 'mobx-state-tree';
import * as moment from 'moment';

import { ITransaction, Transaction } from './transaction';

later.date.localTime();

export type ITimeSeriesData = {
  date: moment.Moment;
  amount: number;
};

const initialSchedule = later.parse
  .recur()
  .on(moment().startOf('day').toDate())
  .fullDate();

const rentSchedule = later.parse.recur().on(1).dayOfMonth();

const salarySchedule = later.parse
  .recur()
  .on(6)
  .dayOfWeek()
  .every(2)
  .weekOfYear()
  .first()
  .hour();

export const TransactionsStore = types.model('TransactionsStore', {
  transactions: types.optional(types.array(Transaction), [
    {
      id: '1',
      name: 'initial',
      amount: 1000,
      scheduleData: {
        schedules: initialSchedule.schedules,
        exceptions: initialSchedule.exceptions
      }
    },
    {
      id: '2',
      name: 'rent',
      amount: -1000,
      scheduleData: {
        schedules: rentSchedule.schedules,
        exceptions: rentSchedule.exceptions
      }
    },
    {
      id: '3',
      name: 'salary',
      amount: 1000,
      scheduleData: {
        schedules: salarySchedule.schedules,
        exceptions: salarySchedule.exceptions
      }
    }
  ]),
  generateTimeSeries(
    startDateTime: Date,
    endDateTime: Date
  ): ITimeSeriesData[] {
    const startDate = moment(startDateTime).startOf('day').toDate();
    const endDate = moment(endDateTime).startOf('day').toDate();

    const occurrences = this.transactions.map(transaction =>
      transaction.getOccurrences(startDate, endDate)
    );

    const range = moment(startDate).twix(endDate, { allDay: true });
    // tslint:disable-next-line
    const days = (range as any).toArray('days') as moment.Moment[];

    let sum = 0;

    return days.map(day => {
      const time = day.toDate().getTime();
      sum += occurrences.reduce((daySum, occurrence) => {
        const occ = occurrence[time];
        return daySum + (occ ? occ.amount : 0);
      }, 0);

      return {
        date: day,
        amount: sum
      };
    });
  }
});
