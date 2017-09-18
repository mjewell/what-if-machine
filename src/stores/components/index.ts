import { types } from 'mobx-state-tree';

import { OverviewTableStore } from './OverviewTable';

export const ComponentsStore = types.model('ComponentsStore', {
  overviewTableStore: types.optional(OverviewTableStore, {})
});

export type IStore = typeof ComponentsStore.Type;

export * from './OverviewTable';
