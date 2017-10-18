import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ICategory, ITransaction } from '../../../models';
import injectStore from '../../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  category: ICategory;
  transactions: ITransaction[];
};

const container = compose<IPresenterProps, IProps>(
  injectStore('transactions.rows'),
  observer
);

export default container(Presenter);
