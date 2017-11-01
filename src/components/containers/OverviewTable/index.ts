import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../../stores';
import Presenter, { IProps } from '../../presenters/OverviewTable';

const injectProps = inject(({ store }: { store: IStore }) => ({
  transactionTotals: store.components.overviewTable.transactionTotals
}));

const container = compose<IProps, {}>(injectProps);

export default container(Presenter);
