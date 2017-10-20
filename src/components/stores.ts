import { getEnv, types } from 'mobx-state-tree';
import { DropResult } from 'react-beautiful-dnd';

import { IStore } from '../stores';

function extractCategoryId(dropzoneId: string) {
  if (!dropzoneId.startsWith('transactions-dropzone-')) {
    throw new Error(
      `Expected a transactions dropzone id but got ${dropzoneId}`
    );
  }

  return dropzoneId.slice('transactions-dropzone-'.length);
}

export const ComponentsStore = types.model('ComponentsStore').actions(self => ({
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
