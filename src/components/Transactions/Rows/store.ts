import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../../stores';

export const RowsStore = types.model('RowsStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { removeTransaction } = store.transactionsStore;

    return {
      removeTransaction: (index: number) => () => removeTransaction(index)
    };
  }
}));
