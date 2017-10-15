import 'twix';

import { sumBy } from 'lodash';
import { types } from 'mobx-state-tree';
import * as moment from 'moment';
import { generate } from 'shortid';

import { ITransaction, Transaction } from '../models';

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
      generateDailyAmounts(startDate: Date, endDate: Date): ITimeSeriesData[] {
        const occurrences = getOccurrences(startDate, endDate);

        const range = moment(startDate).twix(endDate, { allDay: true });
        const days = (range as any).toArray('days') as moment.Moment[];

        let sum = sumBy(occurrences, occurrence => occurrence.before);

        return days.map(day => day.toDate()).map(day => {
          const time = day.getTime();
          sum += sumBy(occurrences, occurrence => occurrence[time] || 0);

          return {
            date: day,
            amount: sum
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
    },

    updateTransactions(transactions: ITransaction[]) {
      self.transactions.replace(transactions);
    }
  }));

export type ITransactionsStore = typeof TransactionsStore.Type;
