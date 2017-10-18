import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import { IProps } from '.';
import { RowsStore } from './Rows/store';
import { TransactionStore } from './Transaction/store';

export const TransactionsStore = types
  .model('TransactionsStore', {
    transaction: types.optional(TransactionStore, {}),
    rows: types.optional(RowsStore, {})
  })
  .views(self => ({
    fromProps({ category }: IProps): any {
      const store = getEnv(self).store as IStore;
      const { addTransaction } = store.transactionsStore;

      return {
        addTransaction: () => addTransaction(category),
        transactions: category.transactions
      };
    }
  }));

export * from './Rows/store';
export * from './Transaction/store';
