import { observer } from 'mobx-react';
import { branch, compose, renderNothing } from 'recompose';

import Presenter, { IProps } from '../../presenters/Category';
import injectStore from '../../utilities/injectStore';
import { Store } from './store';

const hideIfThereIsNoSelectedCategory = branch(
  ({ category }: IProps) => !category,
  renderNothing
);

const container = compose<IProps, {}>(
  injectStore(Store),
  hideIfThereIsNoSelectedCategory,
  observer
);

export default container(Presenter);
