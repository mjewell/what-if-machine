import { getEnv, types } from 'mobx-state-tree';

import { ICategory } from '../../models';
import { IStore } from '../../stores';

export const Store = types.model('CategoriesListStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const {
      categories,
      addCategory,
      selectCategory,
      selectedCategory
    } = store.categoriesStore;

    return {
      categories,
      addCategory,
      selectCategory,
      selectedCategory
    };
  }
}));
