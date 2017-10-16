import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../../stores';

export const RowsStore = types.model('RowsStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { transactions, removeTransaction } = store.transactionsStore;

    return {
      transactions,
      removeTransaction: (index: number) => () => removeTransaction(index)
    };
  }
}));
