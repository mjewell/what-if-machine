import { inject } from 'mobx-react';
import { branch, compose, renderNothing } from 'recompose';

import { IStore } from '../../stores';
import Presenter, { IProps } from '../presenters/Category';

const injectProps = inject(({ store }: { store: IStore }) => {
  const { selectedCategory, removeCategory } = store.categories;

  return {
    category: selectedCategory,
    removeCategory: () => removeCategory(selectedCategory!)
  };
});

const hideIfThereIsNoSelectedCategory = branch(
  ({ category }: IProps) => !category,
  renderNothing
);

const container = compose<IProps, {}>(
  injectProps,
  hideIfThereIsNoSelectedCategory
);

export default container(Presenter);
