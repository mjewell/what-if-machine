import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../../stores';
import Presenter from '../../presenters/Graph';

const injectProps = inject(({ store }: { store: IStore }) => ({
  timeSeries: store.components.graph.timeSeries
}));

const container = compose(injectProps);

export default container(Presenter);
