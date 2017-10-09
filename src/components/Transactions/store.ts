import { sumBy } from 'lodash';
import { getRoot, types } from 'mobx-state-tree';

import { IStore } from '../../stores';

export const TransactionsStore = types
  .model('TransactionsStore')
  .views(self => ({
    get asProps() {
      const root = getRoot(self) as IStore;
      const { addTransaction, transactions } = root.transactionsStore;

      return {
        removeTransaction: (index: number) => () =>
          root.transactionsStore.removeTransaction(index),
        addTransaction,
        transactions
      };
    }
  }));
