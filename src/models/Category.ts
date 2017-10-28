import { getRoot, types } from 'mobx-state-tree';

import { IStore } from '../stores';
import { generate } from 'shortid';

export const Category = types
  .model('Category', {
    id: types.optional(types.identifier(), generate),
    name: types.optional(types.string, ''),
    position: types.refinement(types.number, n => n >= 0)
  })
  .views(self => ({
    get transactions() {
      const root = getRoot(self) as IStore;

      return root.transactionsStore.transactions
        .values()
        .filter(transaction => transaction.category === self)
        .sort((a, b) => a.position - b.position);
    }
  }))
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },

    addTransaction() {
      const root = getRoot(self) as IStore;

      root.transactionsStore.addTransaction(
        self as ICategory,
        self.transactions.length
      );
    },

    removeTransaction(index: number) {
      const root = getRoot(self) as IStore;

      root.transactionsStore.removeTransaction(self.transactions[index]);
    }
  }));

export type ICategory = typeof Category.Type;
