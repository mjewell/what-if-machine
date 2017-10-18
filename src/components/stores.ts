import { getEnv, types } from 'mobx-state-tree';
import { DropResult } from 'react-beautiful-dnd';

import { IStore } from '../stores';
import { CategoriesStore } from './Categories/store';
import { GraphStore } from './Graph/store';
import { OverviewTableStore } from './OverviewTable/store';
import { TransactionsStore } from './Transactions/store';

function extractCategoryId(dropzoneId: string) {
  if (!dropzoneId.startsWith('transactions-dropzone-')) {
    throw new Error(
      `Expected a transactions dropzone id but got ${dropzoneId}`
    );
  }

  return dropzoneId.slice('transactions-dropzone-'.length);
}

export const ComponentsStore = types
  .model('ComponentsStore', {
    categories: types.optional(CategoriesStore, {}),
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
      const { categories } = store.categoriesStore;

      const sourceCategory = categories.get(
        extractCategoryId(source.droppableId)
      )!;
      const destinationCategory = categories.get(
        extractCategoryId(destination.droppableId)
      )!;

      sourceCategory.transactions[source.index].setCategoryAndPosition(
        destinationCategory,
        destination.index
      );
    }
  }));

export type IComponentsStore = typeof ComponentsStore.Type;

export * from './Categories/store';
export * from './Graph/store';
export * from './OverviewTable/store';
export * from './Transactions/store';
