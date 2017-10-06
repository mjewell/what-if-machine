import { inject, observer } from 'mobx-react';
import { compose, mapProps } from 'recompose';

import { ITransaction } from '../../models';
import { IStore } from '../../stores';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  transaction: ITransaction;
};

const container = compose<IPresenterProps, IProps>(
  observer,
  mapProps<IPresenterProps, IProps>(({ transaction }) => {
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
  }),
  observer
);

export default container(Presenter);

// inject gives interface to stores
