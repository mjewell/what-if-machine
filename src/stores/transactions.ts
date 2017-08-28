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
  .views(self => {
    function getOccurrences(
      startDateTime: Date | moment.Moment,
      endDateTime: Date | moment.Moment
    ) {
      const startDate = moment(startDateTime).startOf('day').toDate();
      const endDate = moment(endDateTime).startOf('day').toDate();

      return self.transactions.map(transaction =>
        transaction.getOccurrences(startDate, endDate)
      );
    }

    return {
      generateTimeSeries(
        startDateTime: Date | moment.Moment,
        endDateTime: Date | moment.Moment
      ): ITimeSeriesData[] {
        const occurrences = getOccurrences(startDateTime, endDateTime);

        const startDate = moment(startDateTime).startOf('day').toDate();
        const endDate = moment(endDateTime).startOf('day').toDate();
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
      },

      generateAmountData(
        startDateTime: Date | moment.Moment,
        endDateTime: Date | moment.Moment
      ): any {
        const occurrences = getOccurrences(startDateTime, endDateTime);

        const beforeSums = occurrences.map(occurrence => occurrence.before);
        const duringSums = occurrences.map(occurrence => {
          return Object.keys(occurrence).reduce((sum, time) => {
            return sum + occurrence[time];
          }, 0);
        });

        return self.transactions.map((transaction, index) => {
          const before = beforeSums[index];
          const during = duringSums[index];
          return {
            id: transaction.id,
            name: transaction.name,
            before,
            during,
            total: before + during
          };
        });
      }
    };
  })
  .actions(self => ({
    addTransaction() {
      self.transactions.push(Transaction.create({ id: generate() }));
    },

    removeTransaction(index: number) {
      self.transactions.splice(index, 1);
    }
  }));
