import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import categoryToProps from '../categoryToProps';

export const Store = types.model('CategoriesStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { selectedCategory, removeCategory } = store.categoriesStore;

    return {
      selectedCategory: selectedCategory && categoryToProps(selectedCategory),
      removeCategory: () => selectedCategory && removeCategory(selectedCategory)
    };
  }
}));
