import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ITransaction } from '../../../models';
import injectStore from '../../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  transactions: ITransaction[];
};

const container = compose<IPresenterProps, IProps>(
  injectStore('transactions.rows'),
  observer
);

export default container(Presenter);
