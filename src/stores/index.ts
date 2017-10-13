import { types } from 'mobx-state-tree';

import { FiltersStore } from './FiltersStore';
import { TransactionsStore } from './TransactionsStore';

export const Store = types.model('Store', {
  transactionsStore: types.optional(TransactionsStore, {}),
  filtersStore: types.optional(FiltersStore, {})
});

export type IStore = typeof Store.Type;

export * from './FiltersStore';
export * from './TransactionsStore';
