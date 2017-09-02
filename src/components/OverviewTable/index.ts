import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../stores';
import Presenter from './presenter';

const container = compose(
  inject(({ store }: { store: IStore }) => ({
    transactionTotals: store.components.overviewTableStore.transactionTotals
  })),
  observer
);

export default container(Presenter);
