import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import { RowsStore } from './Rows/store';
import { TransactionStore } from './Transaction/store';

export const TransactionsStore = types
  .model('TransactionsStore', {
    transaction: types.optional(TransactionStore, {}),
    rows: types.optional(RowsStore, {})
  })
  .views(self => ({
    get asProps() {
      const store = getEnv(self).store as IStore;
      const { addTransaction } = store.transactionsStore;

      return {
        addTransaction
      };
    }
  }));

export * from './Rows/store';
export * from './Transaction/store';
