import { sumBy } from 'lodash';
import { getEnv, types } from 'mobx-state-tree';

import { ICategory } from '../../models';
import { IStore } from '../../stores';

export const Store = types.model('CategoriesStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { categories, addCategory, removeCategory } = store.categoriesStore;

    return {
      categories: categories.values(),
      addCategory,
      removeCategory: (category: ICategory) => () => removeCategory(category)
    };
  }
}));
