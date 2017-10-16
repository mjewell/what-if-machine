import { observer } from 'mobx-react';
import { compose } from 'recompose';

import injectStore from '../../../utilities/injectStore';
import Presenter, { IProps } from './presenter';

const container = compose<IProps, {}>(
  injectStore('transactions.rows'),
  observer
);

export default container(Presenter);
