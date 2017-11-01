import { types } from 'mobx-state-tree';

import { CategoriesListStore } from './CategoriesList/store';
import { GraphStore } from './Graph/store';
import { OverviewTableStore } from './OverviewTable/store';

export const ComponentsStore = types.model('ComponentsStore', {
  categoriesList: types.optional(CategoriesListStore, {}),
  graph: types.optional(GraphStore, {}),
  overviewTable: types.optional(OverviewTableStore, {})
});

export type IComponentsStore = typeof ComponentsStore.Type;
