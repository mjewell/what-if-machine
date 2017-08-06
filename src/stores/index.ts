import { types } from 'mobx-state-tree';

import { TransactionsStore } from './transactions';

export const Store = types.model('Store', {
  transactions: types.optional(TransactionsStore, {})
});
