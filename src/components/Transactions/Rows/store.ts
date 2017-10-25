import { types } from 'mobx-state-tree';
import { IProps } from '.';

export const Store = types.model('RowsStore').views(self => ({
  fromProps({ category }: IProps): any {
    return {
      removeTransaction: (index: number) => () =>
        category.removeTransaction(index)
    };
  }
}));
