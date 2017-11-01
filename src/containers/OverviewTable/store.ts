import { sumBy } from 'lodash';
import { getRoot, types } from 'mobx-state-tree';

import { ITransactionTotal } from '../../presenters/OverviewTable';
import { IStore } from '../../stores';

export const OverviewTableStore = types
  .model('OverviewTableStore')
  .views(self => ({
    get transactionTotals(): ITransactionTotal[] {
      const store = getRoot(self) as IStore;
      const { startDate, endDate } = store.filters;
      const { transactions } = store.transactions;

      const itemTotals = transactions
        .values()
        .map(({ id, name, getTotals }) => ({
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
  }));
