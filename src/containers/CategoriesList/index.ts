import { inject } from 'mobx-react';
import { compose } from 'recompose';

import Presenter, { IProps } from '../../presenters/CategoriesList';
import { IStore } from '../../stores';

const injectProps = inject(({ store }: { store: IStore }) => {
  const {
    categories,
    addCategory,
    selectCategory,
    selectedCategory
  } = store.categories;

  return {
    categories,
    addCategory,
    selectCategory: store.components.categoriesList.toggleSelected,
    selectedCategory
  };
});

const container = compose<IProps, {}>(injectProps);

export default container(Presenter);
