import { sumBy } from 'lodash';
import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';

export const CategoriesStore = types.model('CategoriesStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { categories, addCategory } = store.categoriesStore;

    return {
      categories: categories.values(),
      addCategory
    };
  }
}));
