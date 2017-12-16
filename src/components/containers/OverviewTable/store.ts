import { getRoot, types } from 'mobx-state-tree';
import { IStore } from '../../../stores';
import { sumDecimals } from '../../../utilities/decimals';
import { ITransactionTotal } from '../../presenters/OverviewTable';

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
        ...itemTotals.map(({ id, name, before, during, total }) => ({
          id,
          name,
          before: +before.toFixed(2),
          during: +during.toFixed(2),
          total: +total.toFixed(2)
        })),
        {
          id: 'totals',
          name: 'Total',
          before: +sumDecimals(
            itemTotals.map(itemTotal => itemTotal.before)
          ).toFixed(2),
          during: +sumDecimals(
            itemTotals.map(itemTotal => itemTotal.during)
          ).toFixed(2),
          total: +sumDecimals(
            itemTotals.map(itemTotal => itemTotal.total)
          ).toFixed(2)
        }
      ];
    }
  }));
