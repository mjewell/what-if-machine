import { sumBy } from 'lodash';
import { getRoot, types } from 'mobx-state-tree';

import { ITransaction } from '../../models';
import { IStore } from '../../stores';

export type IProps = {
  transaction: ITransaction;
};

export const TransactionStore = types.model('TransactionStore').views(self => ({
  fromProps({ transaction }: IProps): any {
    const {
      amountStr,
      name,
      recurrence,
      setAmount,
      setName,
      setRecurrence
    } = transaction;

    return {
      amountStr,
      name,
      recurrence,
      setAmount: (e: any) => setAmount(e.target.value),
      setName: (e: any) => setName(e.target.value),
      setRecurrence
    };
  }
}));
