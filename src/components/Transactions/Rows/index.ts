import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ICategory, ITransaction } from '../../../models';
import injectStore from '../../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';
import { Store } from './store';

export type IProps = {
  category: ICategory;
  transactions: ITransaction[];
};

const container = compose<IPresenterProps, IProps>(
  injectStore(Store),
  observer
);

export default container(Presenter);
