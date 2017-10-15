import { inject, observer } from 'mobx-react';
import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc';
import { compose } from 'recompose';

import Presenter, { IProps } from './presenter';

const container = compose<IProps, IProps & SortableContainerProps>(
  SortableContainer,
  observer
);

export default container(Presenter);
