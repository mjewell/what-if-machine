import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';

export const Store = types.model('CategoriesStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { selectedCategory, removeCategory } = store.categoriesStore;

    return {
      category: selectedCategory,
      removeCategory: () => removeCategory(selectedCategory!)
    };
  }
}));
