import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../../stores';
import { IProps } from '.';

export const RowsStore = types.model('RowsStore').views(self => ({
  fromProps({ category }: IProps): any {
    return {
      removeTransaction: (index: number) => () =>
        category.removeTransaction(index)
    };
  }
}));
