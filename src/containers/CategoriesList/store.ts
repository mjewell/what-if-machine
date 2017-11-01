import { getRoot, types } from 'mobx-state-tree';

import { ICategory } from '../../models';
import { IStore } from '../../stores';

export const CategoriesListStore = types
  .model('CategoriesListStore')
  .actions(self => ({
    toggleSelected(category: ICategory) {
      const store = getRoot(self) as IStore;
      const { selectCategory, selectedCategory } = store.categories;

      if (category === selectedCategory) {
        selectCategory(null);
        return;
      }

      selectCategory(category);
    }
  }));
