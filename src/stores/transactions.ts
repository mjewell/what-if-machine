import { types } from 'mobx-state-tree';

import { Transaction } from './transaction';

export const TransactionsStore = types.model('TransactionsStore', {
  transactions: types.optional(types.array(Transaction), [])
});
