import { observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter, { IProps } from '../../presenters/OverviewTable';
import injectStore from '../../utilities/injectStore';
import { Store } from './store';

const container = compose<IProps, {}>(injectStore(Store));

export default container(Presenter);
