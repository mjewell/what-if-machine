import { types } from 'mobx-state-tree';

import { Category } from '../models';

export const CategoriesStore = types
  .model('CategoriesStore', {
    categories: types.optional(types.array(Category), [])
  })
  .actions(self => ({
    addCategory() {
      self.categories.push(Category.create());
    }
  }));

export type ICategoriesStore = typeof CategoriesStore.Type;
