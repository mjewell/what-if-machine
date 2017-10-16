import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ITransaction } from '../../../models';
import injectStore from '../../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  transaction: ITransaction;
};

const container = compose<IPresenterProps, IProps>(
  injectStore('transactions.transaction'),
  observer
);

export default container(Presenter);
