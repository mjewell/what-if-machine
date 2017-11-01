import { types } from 'mobx-state-tree';

import { ComponentsStore } from '../components/containers/store';
import { CategoriesStore } from './CategoriesStore';
import { FiltersStore } from './FiltersStore';
import { TransactionsStore } from './TransactionsStore';

export const Store = types.model('Store', {
  components: types.optional(ComponentsStore, {}),
  categories: types.optional(CategoriesStore, {}),
  transactions: types.optional(TransactionsStore, {}),
  filters: types.optional(FiltersStore, {})
});

export type IStore = typeof Store.Type;

export * from '../components/containers/store';
export * from './CategoriesStore';
export * from './FiltersStore';
export * from './TransactionsStore';
