import { inject } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../../stores';
import Presenter, { IProps } from '../../presenters/CategoriesList';

const injectProps = inject(({ store }: { store: IStore }) => {
  const { categories, addCategory, selectedCategory } = store.categories;

  return {
    categories,
    addCategory,
    selectCategory: store.components.categoriesList.toggleSelected,
    selectedCategory
  };
});

const container = compose<IProps, {}>(injectProps);

export default container(Presenter);
