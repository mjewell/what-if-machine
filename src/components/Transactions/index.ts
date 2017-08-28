import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter from './presenter';

const container = compose(inject('store'), observer);

export default container(Presenter);
