import { types } from 'mobx-state-tree';

import { OverviewTableStore } from './OverviewTable/store';

export const ComponentsStore = types.model('ComponentsStore', {
  overviewTable: types.optional(OverviewTableStore, {})
});

export type IComponentsStore = typeof ComponentsStore.Type;

export * from './OverviewTable/store';
