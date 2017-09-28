import { types } from 'mobx-state-tree';

import { OverviewTableStore } from './OverviewTableStore';

export const ComponentsStore = types.model('ComponentsStore', {
  overviewTableStore: types.optional(OverviewTableStore, {})
});

export type IComponentsStore = typeof ComponentsStore.Type;

export * from './OverviewTableStore';
