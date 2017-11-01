import { types } from 'mobx-state-tree';

import { CategoriesListStore } from './CategoriesList/store';
import { DraggingStore } from './DraggingStore';
import { GraphStore } from './Graph/store';
import { OverviewTableStore } from './OverviewTable/store';

export const ComponentsStore = types.model('ComponentsStore', {
  categoriesList: types.optional(CategoriesListStore, {}),
  dragging: types.optional(DraggingStore, {}),
  graph: types.optional(GraphStore, {}),
  overviewTable: types.optional(OverviewTableStore, {})
});

export type IComponentsStore = typeof ComponentsStore.Type;
