import { getEnv, types } from 'mobx-state-tree';
import { DropResult } from 'react-beautiful-dnd';

import { IStore } from '../stores';
import { GraphStore } from './Graph/store';
import { OverviewTableStore } from './OverviewTable/store';
import { TransactionsStore } from './Transactions/store';

export const ComponentsStore = types
  .model('ComponentsStore', {
    overviewTable: types.optional(OverviewTableStore, {}),
    transactions: types.optional(TransactionsStore, {}),
    graph: types.optional(GraphStore, {})
  })
  .actions(self => ({
    onDragEnd({ source, destination }: DropResult) {
      if (!destination) {
        return;
      }

      const store = getEnv(self).store as IStore;
      const { reorderTransactions } = store.transactionsStore;

      reorderTransactions(source.index, destination.index);
    }
  }));

export type IComponentsStore = typeof ComponentsStore.Type;

export * from './Graph/store';
export * from './OverviewTable/store';
export * from './Transactions/store';
