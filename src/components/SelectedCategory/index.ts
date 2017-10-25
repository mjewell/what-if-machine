import { observer } from 'mobx-react';
import { compose } from 'recompose';

import injectStore from '../../utilities/injectStore';
import Presenter, { IProps } from './presenter';
import { Store } from './store';

const container = compose<IProps, {}>(injectStore(Store), observer);

export default container(Presenter);
