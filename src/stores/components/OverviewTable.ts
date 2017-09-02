import { getRoot, types } from 'mobx-state-tree';
import * as moment from 'moment';

import { IStore } from '../../stores';

export const OverviewTableStore = types
  .model('OverviewTableStore')
  .views(self => ({
    get transactionTotals() {
      const root = getRoot(self) as IStore;
      const { startDate, endDate } = root.graphStore;
      const { transactions } = root.transactionsStore;

      const itemTotals = transactions.map(({ id, name, getTotals }) => ({
        id,
        name,
        ...getTotals(startDate, endDate)
      }));

      const subtotals = itemTotals.reduce(
        (totals: any, { before, during, total }: any) => ({
          before: totals.before + before,
          during: totals.during + during,
          total: totals.total + total
        }),
        {
          before: 0,
          during: 0,
          total: 0
        }
      );

      return itemTotals.concat({
        id: 'totals',
        name: 'Total',
        ...subtotals
      });
    }
  }));
