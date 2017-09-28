import { types } from 'mobx-state-tree';

import { ComponentsStore } from './ComponentsStore';
import { FiltersStore } from './FiltersStore';
import { TransactionsStore } from './TransactionsStore';

export const Store = types.model('Store', {
  transactionsStore: types.optional(TransactionsStore, {}),
  filtersStore: types.optional(FiltersStore, {}),
  components: types.optional(ComponentsStore, {})
});

export type IStore = typeof Store.Type;

export * from './ComponentsStore';
export * from './FiltersStore';
export * from './TransactionsStore';
