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

      const subtotals = itemTotals.reduce(
        (totals, { before, during, total }: ITransactionTotal) => ({
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
