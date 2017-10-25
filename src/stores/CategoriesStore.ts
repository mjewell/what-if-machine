import { getRoot, types } from 'mobx-state-tree';
import { IStore } from '.';
import { Category, ICategory } from '../models';

export const CategoriesStore = types
  .model('CategoriesStore', {
    categories: types.optional(types.map(Category), {}),
    selectedCategory: types.maybe(types.reference(Category))
  })
  .actions(self => ({
    addCategory() {
      const category = Category.create();
      self.categories.put(category);
      self.selectedCategory = category;
    },

    removeCategory(category: ICategory) {
      const store = getRoot(self) as IStore;
      category.transactions.forEach(store.transactionsStore.removeTransaction);

      self.categories.delete(category.id as string);

      if (self.selectedCategory === category) {
        self.selectedCategory = self.categories.values()[0];
      }
    },

    selectCategory(category: ICategory) {
      self.selectedCategory = category;
    }
  }));

export type ICategoriesStore = typeof CategoriesStore.Type;
