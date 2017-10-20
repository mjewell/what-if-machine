import { getRoot, types } from 'mobx-state-tree';

import { Category, ICategory } from '../models';
import { IStore } from '.';

export const CategoriesStore = types
  .model('CategoriesStore', {
    categories: types.optional(types.map(Category), {})
  })
  .actions(self => ({
    addCategory() {
      self.categories.put(Category.create());
    },

    removeCategory(category: ICategory) {
      const store = getRoot(self) as IStore;
      category.transactions.forEach(store.transactionsStore.removeTransaction);
      self.categories.delete(category.id as string);
    }
  }));

export type ICategoriesStore = typeof CategoriesStore.Type;
