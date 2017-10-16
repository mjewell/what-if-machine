import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';

export const TransactionsStore = types
  .model('TransactionsStore')
  .views(self => ({
    get asProps() {
      const store = getEnv(self).store as IStore;
      const { addTransaction, transactions } = store.transactionsStore;

      return {
        removeTransaction: (index: number) => () =>
          store.transactionsStore.removeTransaction(index),
        addTransaction,
        transactions
      };
    }
  }));
