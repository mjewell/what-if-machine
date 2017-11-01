import { getRoot, types } from 'mobx-state-tree';

import { Category, ICategory } from '../models';
import { IStore } from '.';

export const CategoriesStore = types
  .model('CategoriesStore', {
    categoriesHash: types.optional(types.map(Category), {}),
    selectedCategory: types.maybe(types.reference(Category))
  })
  .views(self => ({
    get categories() {
      return self.categoriesHash
        .values()
        .sort((a, b) => a.position - b.position);
    }
  }))
  .actions(self => ({
    addCategory() {
      const category = Category.create({ position: self.categoriesHash.size });
      self.categoriesHash.put(category);
      self.selectedCategory = category;
    },

    removeCategory(category: ICategory) {
      const store = getRoot(self) as IStore;

      if (self.selectedCategory === category) {
        self.selectedCategory = null;
      }

      category.transactions.forEach(store.transactions.removeTransaction);

      const { position } = category;

      self.categoriesHash.delete(category.id as string);

      self.categoriesHash
        .values()
        .filter(c => c.position > position)
        .forEach(c => (c.position -= 1));
    },

    selectCategory(category: ICategory | null) {
      self.selectedCategory = category;
    }
  }));

export type ICategoriesStore = typeof CategoriesStore.Type;
