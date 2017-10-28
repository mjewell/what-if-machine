import { observer } from 'mobx-react';
import { compose } from 'recompose';

import { ITransaction } from '../../../models';
import Presenter, {
  IProps as IPresenterProps
} from '../../../presenters/Transaction';
import injectStore from '../../../utilities/injectStore';
import { Store } from './store';

export type IProps = {
  transaction: ITransaction;
};

const container = compose<IPresenterProps, IProps>(
  injectStore(Store),
  observer
);

export default container(Presenter);
