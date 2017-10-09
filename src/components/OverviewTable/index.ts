import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import { IStore } from '../../stores';
import injectStore from '../../utilities/injectStore';
import Presenter, { IProps } from './presenter';

const container = compose<IProps, {}>(injectStore('overviewTable'), observer);

export default container(Presenter);
