import { withTooltip } from '@vx/tooltip';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import injectStore from '../../utilities/injectStore';
import Presenter from './presenter';

const container = compose(injectStore('graph'), withTooltip, observer);

export default container(Presenter);
