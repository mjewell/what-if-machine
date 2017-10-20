import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import { IProps } from '.';

export const Store = types.model('TransactionsStore').views(self => ({
  fromProps({ category }: IProps): any {
    return {
      addTransaction: category.addTransaction,
      transactions: category.transactions
    };
  }
}));
