import { types } from 'mobx-state-tree';

import { CategoriesStore } from './CategoriesStore';
import { FiltersStore } from './FiltersStore';
import { TransactionsStore } from './TransactionsStore';

export const Store = types.model('Store', {
  categoriesStore: types.optional(CategoriesStore, {}),
  transactionsStore: types.optional(TransactionsStore, {}),
  filtersStore: types.optional(FiltersStore, {})
});

export type IStore = typeof Store.Type;

export * from './CategoriesStore';
export * from './FiltersStore';
export * from './TransactionsStore';
