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
      return transactions.map(({ id, name, getTotals }) => ({
        id,
        name,
        ...getTotals(startDate, endDate)
      }));
    }
  }));
