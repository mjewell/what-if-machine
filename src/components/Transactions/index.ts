import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ICategory } from '../../models';
import injectStore from '../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  category: ICategory;
};

const container = compose<IPresenterProps, IProps>(
  injectStore('transactions'),
  observer
);

export default container(Presenter);
