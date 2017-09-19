import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../stores';
import Presenter, { IProps } from './presenter';

const container = compose<IProps, {}>(
  inject(({ store }: { store: IStore }) => ({
    transactionTotals: store.components.overviewTableStore.transactionTotals
  })),
  observer
);

export default container(Presenter);
