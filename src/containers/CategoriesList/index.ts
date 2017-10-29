import { observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter, { IProps } from '../../presenters/CategoriesList';
import injectStore from '../../utilities/injectStore';
import { Store } from './store';

const container = compose<IProps, {}>(injectStore(Store), observer);

export default container(Presenter);
