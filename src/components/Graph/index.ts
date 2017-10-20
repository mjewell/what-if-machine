import { observer } from 'mobx-react';
import { compose } from 'recompose';

import injectStore from '../../utilities/injectStore';
import Presenter from './presenter';
import { Store } from './store';

const container = compose(injectStore(Store), observer);

export default container(Presenter);
