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
      return {
        addTransaction: category.addTransaction,
        transactions: category.transactions
      };
    }
  }));

export * from './Rows/store';
export * from './Transaction/store';
