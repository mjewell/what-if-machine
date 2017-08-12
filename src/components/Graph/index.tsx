import { inject } from 'mobx-react';
import { compose } from 'recompose';

import Presenter from './presenter';

const container = compose(inject('store'));

export default container(Presenter);
