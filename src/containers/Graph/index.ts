import { observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter from '../../presenters/Graph';
import injectStore from '../../utilities/injectStore';
import { Store } from './store';

const container = compose(injectStore(Store));

export default container(Presenter);
