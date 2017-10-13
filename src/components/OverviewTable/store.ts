import { sumBy } from 'lodash';
import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';

export type ITransactionTotal = {
  id: {};
  name: string;
  before: number;
  during: number;
  total: number;
};

export const OverviewTableStore = types
  .model('OverviewTableStore')
  .views(self => ({
    get transactionTotals(): ITransactionTotal[] {
      const store = getEnv(self).store as IStore;
      const { startDate, endDate } = store.filtersStore;
      const { transactions } = store.transactionsStore;

      const itemTotals = transactions.map(({ id, name, getTotals }) => ({
        id,
        name,
        ...getTotals(startDate, endDate)
      }));

      return [
        ...itemTotals,
        {
          id: 'totals',
          name: 'Total',
          before: sumBy(itemTotals, itemTotal => itemTotal.before),
          during: sumBy(itemTotals, itemTotal => itemTotal.during),
          total: sumBy(itemTotals, itemTotal => itemTotal.total)
        }
      ];
    }
  }))
  .views(self => ({
    get asProps() {
      return {
        transactionTotals: self.transactionTotals
      };
    }
  }));
