import { types } from 'mobx-state-tree';

import { ComponentsStore } from './components';
import { GraphStore } from './graph';
import { TransactionsStore } from './TransactionsStore';

export const Store = types.model('Store', {
  transactionsStore: types.optional(TransactionsStore, {}),
  graphStore: types.optional(GraphStore, {}),
  components: types.optional(ComponentsStore, {})
});

export type IStore = typeof Store.Type;

export * from './components';
export * from './types';
export * from './graph';
export * from './transaction';
export * from './TransactionsStore';
