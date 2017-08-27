import { types } from 'mobx-state-tree';

import { GraphStore } from './graph';
import { TransactionsStore } from './transactions';

export const Store = types.model('Store', {
  transactionsStore: types.optional(TransactionsStore, {}),
  graphStore: types.optional(GraphStore, {})
});

export type IStore = typeof Store.Type;
