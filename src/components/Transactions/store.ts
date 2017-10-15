import { sumBy } from 'lodash';
import { getEnv, types } from 'mobx-state-tree';
import { arrayMove } from 'react-sortable-hoc';

import { IStore } from '../../stores';

export const TransactionsStore = types
  .model('TransactionsStore')
  .views(self => ({
    onSortEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
      const store = getEnv(self).store as IStore;
      const { transactions, updateTransactions } = store.transactionsStore;

      return updateTransactions(arrayMove(transactions, oldIndex, newIndex));
    }
  }))
  .views(self => ({
    get asProps() {
      const store = getEnv(self).store as IStore;
      const {
        addTransaction,
        transactions,
        updateTransactions
      } = store.transactionsStore;

      return {
        removeTransaction: (index: number) => () =>
          store.transactionsStore.removeTransaction(index),
        addTransaction,
        transactions,
        onSortEnd: self.onSortEnd
      };
    }
  }));
