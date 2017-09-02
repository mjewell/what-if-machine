import 'twix';

import { types } from 'mobx-state-tree';
import * as moment from 'moment';
import { generate } from 'shortid';

import { Transaction } from './transaction';

export type ITimeSeriesData = {
  date: Date;
  amount: number;
};

export const TransactionsStore = types
  .model('TransactionsStore', {
    transactions: types.optional(types.array(Transaction), [])
  })
  .views(self => {
    function getOccurrences(startDate: Date, endDate: Date) {
      return self.transactions.map(transaction =>
        transaction.getOccurrences(startDate, endDate)
      );
    }

    return {
      generateTimeSeries(startDate: Date, endDate: Date): ITimeSeriesData[] {
        const occurrences = getOccurrences(startDate, endDate);

        const range = moment(startDate).twix(endDate, { allDay: true });
        const days = (range as any).toArray('days') as moment.Moment[];

        let sum = occurrences.reduce((beforeSum, occurrence) => {
          return beforeSum + occurrence.before;
        }, 0);

        return days.map(day => day.toDate()).map(day => {
          const time = day.getTime();
          sum += occurrences.reduce((daySum, occurrence) => {
            return daySum + (occurrence[time] || 0);
          }, 0);

          return {
            date: day,
            amount: sum
          };
        });
      },

      generateAmountData(startDate: Date, endDate: Date): any {
        const occurrences = getOccurrences(startDate, endDate);

        const beforeSums = occurrences.map(occurrence => occurrence.before);
        const duringSums = occurrences.map(occurrence => {
          return Object.keys(occurrence)
            .filter(k => k !== 'before')
            .reduce((sum, time) => {
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
