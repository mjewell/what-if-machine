import { types } from 'mobx-state-tree';

import { ITransaction } from '../../../models';

export type IProps = {
  transaction: ITransaction;
};

export const Store = types.model('TransactionStore').views(self => ({
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
      amount: amountStr,
      name,
      recurrence,
      setAmount: (e: any) => setAmount(e.target.value),
      setName: (e: any) => setName(e.target.value),
      setRecurrence
    };
  }
}));
