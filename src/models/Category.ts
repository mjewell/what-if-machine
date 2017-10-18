import { getRoot, types } from 'mobx-state-tree';
import { generate } from 'shortid';

import { IStore } from '../stores';

export const Category = types
  .model('Category', {
    id: types.optional(types.identifier(), generate)
  })
  .views(self => ({
    get transactions() {
      const root = getRoot(self) as IStore;

      return root.transactionsStore.transactions.filter(
        transaction => transaction.category === self
      );
    }
  }));

export type ICategory = typeof Category.Type;
