import './styles.css';

import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import Presenter, { IProps } from './presenter';

const container = compose<IProps, IProps>(observer);

export default container(Presenter);
