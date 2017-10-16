import { observer } from 'mobx-react';
import { compose } from 'recompose';

import injectStore from '../../utilities/injectStore';
import Presenter from './presenter';

const container = compose(injectStore('graph'), observer);

export default container(Presenter);
