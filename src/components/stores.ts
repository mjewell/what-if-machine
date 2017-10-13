import { types } from 'mobx-state-tree';

import { GraphStore } from './Graph/store';
import { OverviewTableStore } from './OverviewTable/store';
import { TransactionStore } from './Transaction/store';
import { TransactionsStore } from './Transactions/store';

export const ComponentsStore = types.model('ComponentsStore', {
  overviewTable: types.optional(OverviewTableStore, {}),
  transactions: types.optional(TransactionsStore, {}),
  transaction: types.optional(TransactionStore, {}),
  graph: types.optional(GraphStore, {})
});

export type IComponentsStore = typeof ComponentsStore.Type;

export * from './Graph/store';
export * from './OverviewTable/store';
export * from './Transactions/store';
export * from './Transaction/store';
