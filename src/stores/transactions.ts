import 'twix';

import * as later from 'later';
import { types } from 'mobx-state-tree';
import * as moment from 'moment';
import { generate } from 'shortid';

import { Transaction } from './transaction';

later.date.localTime();

export type ITimeSeriesData = {
  date: Date;
  amount: number;
};

export const TransactionsStore = types
  .model('TransactionsStore', {
    transactions: types.optional(types.array(Transaction), [])
  })
  .views(self => ({
    generateTimeSeries(
      startDateTime: Date,
      endDateTime: Date
    ): ITimeSeriesData[] {
      const startDate = moment(startDateTime).startOf('day').toDate();
      const endDate = moment(endDateTime).startOf('day').toDate();

      const occurrences = self.transactions.map(transaction =>
        transaction.getOccurrences(startDate, endDate)
      );

      const range = moment(startDate).twix(endDate, { allDay: true });
      const days = (range as any).toArray('days') as moment.Moment[];

      let sum = occurrences.reduce((beforeSum, occurrence) => {
        return beforeSum + occurrence.before;
      }, 0);

      return days.map(day => {
        const time = day.toDate().getTime();
        sum += occurrences.reduce((daySum, occurrence) => {
          return daySum + (occurrence[time] || 0);
        }, 0);

        return {
          date: day.toDate(),
          amount: sum
        };
      });
    }
  }))
  .actions(self => ({
    addTransaction() {
      self.transactions.push(Transaction.create({ id: generate() }));
    },

    removeTransaction(index: number) {
      self.transactions.splice(index, 1);
    }
  }));
