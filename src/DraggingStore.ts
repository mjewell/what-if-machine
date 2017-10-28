import { getEnv, types } from 'mobx-state-tree';

import { DropResult } from 'react-beautiful-dnd';
import { IStore } from './stores';

function extractCategoryId(dropzoneId: string) {
  if (!dropzoneId.startsWith('transactions-dropzone-')) {
    throw new Error(
      `Expected a transactions dropzone id but got ${dropzoneId}`
    );
  }

  return dropzoneId.slice('transactions-dropzone-'.length);
}

export const DraggingStore = types.model('DraggingStore').actions(self => ({
  onDragEnd({ source, destination }: DropResult) {
    if (!destination) {
      return;
    }

    const store = getEnv(self).store as IStore;
    const { categoriesHash } = store.categoriesStore;

    const sourceCategory = categoriesHash.get(
      extractCategoryId(source.droppableId)
    )!;
    const destinationCategory = categoriesHash.get(
      extractCategoryId(destination.droppableId)
    )!;

    sourceCategory.transactions[source.index].setCategoryAndPosition(
      destinationCategory,
      destination.index
    );
  }
}));

export type IDraggingStore = typeof DraggingStore.Type;
