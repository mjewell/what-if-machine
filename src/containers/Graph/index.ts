import { inject } from 'mobx-react';
import { compose } from 'recompose';

import Presenter from '../../presenters/Graph';
import { IStore } from '../../stores';

const injectProps = inject(({ store }: { store: IStore }) => ({
  timeSeries: store.components.graph.timeSeries
}));

const container = compose(injectProps);

export default container(Presenter);
