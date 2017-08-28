import { withTooltip } from '@vx/tooltip';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter from './presenter';

const container = compose(inject('store'), withTooltip, observer);

export default container(Presenter);
