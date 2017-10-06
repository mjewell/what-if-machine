import { sumBy } from 'lodash';
import { getRoot, types } from 'mobx-state-tree';

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
      const root = getRoot(self) as IStore;
      const { startDate, endDate } = root.filtersStore;
      const { transactions } = root.transactionsStore;

      const itemTotals = transactions.map(({ id, name, getTotals }) => ({
        id,
        name,
        ...getTotals(startDate, endDate)
      }));

      return itemTotals.concat({
        id: 'totals',
        name: 'Total',
        before: sumBy(itemTotals, itemTotal => itemTotal.before),
        during: sumBy(itemTotals, itemTotal => itemTotal.during),
        total: sumBy(itemTotals, itemTotal => itemTotal.total)
      });
    }
  }));
