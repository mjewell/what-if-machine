import { inject, observer } from 'mobx-react';
import { compose, mapProps } from 'recompose';

import { ITransaction } from '../../models';
import { IStore } from '../../stores';
import injectStore from '../../utilities/injectStore';
import Presenter, { IProps as IPresenterProps } from './presenter';

export type IProps = {
  transaction: ITransaction;
};

const container = compose<IPresenterProps, IProps>(
  injectStore('transaction'),
  observer
);

export default container(Presenter);
