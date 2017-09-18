import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../stores';
import Presenter, { IProps } from './presenter';

const container = compose<IProps, {}>(
  inject(({ store }: { store: IStore }): any => {
    const {
      removeTransaction,
      addTransaction,
      transactions
    } = store.transactionsStore;

    return {
      removeTransaction: (index: number) => () => removeTransaction(index),
      addTransaction: addTransaction,
      transactions: transactions
    };
  }),
  observer
);

export default container(Presenter);
