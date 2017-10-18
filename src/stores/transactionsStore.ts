import 'twix';

import { sumBy } from 'lodash';
import { getSnapshot, types } from 'mobx-state-tree';
import * as moment from 'moment';

import { ICategory, ITransaction, Transaction } from '../models';

export type ITimeSeriesData = {
  date: Date;
  amount: number;
};

export const TransactionsStore = types
  .model('TransactionsStore', {
    transactions: types.optional(types.map(Transaction), {})
  })
  .views(self => {
    function getOccurrences(startDate: Date, endDate: Date) {
      return self.transactions
        .values()
        .map(transaction => transaction.getOccurrences(startDate, endDate));
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
    addTransaction(category: ICategory, position: number) {
      self.transactions.put(Transaction.create({ category, position }));
    },

    removeTransaction(transaction: ITransaction) {
      self.transactions.delete(transaction.id as string);
    }
  }));

export type ITransactionsStore = typeof TransactionsStore.Type;
