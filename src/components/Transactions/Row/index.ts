import { inject, observer } from 'mobx-react';
import { SortableElement, SortableElementProps } from 'react-sortable-hoc';
import { compose } from 'recompose';

import Presenter, { IProps } from './presenter';

const container = compose<IProps, IProps & SortableElementProps>(
  SortableElement,
  observer
);

export default container(Presenter);
