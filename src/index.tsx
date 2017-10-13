import './index.css';

import { Provider } from 'mobx-react';
import { applySnapshot, onSnapshot } from 'mobx-state-tree';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import { ComponentsStore } from './components/stores';
import registerServiceWorker from './registerServiceWorker';
import { Store } from './stores';

const store = Store.create({});
const state = localStorage.getItem('state');
const componentsStore = ComponentsStore.create({}, { store });

if (state) {
  applySnapshot(store, JSON.parse(state));
}

onSnapshot(store, snapshot => {
  localStorage.setItem('state', JSON.stringify(snapshot));
});

ReactDOM.render(
  <Provider componentsStore={componentsStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
