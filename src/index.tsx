import './index.css';

import { Provider } from 'mobx-react';
import { applySnapshot, onSnapshot } from 'mobx-state-tree';
import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import { DraggingStore } from './DraggingStore';
import registerServiceWorker from './registerServiceWorker';
import { Store } from './stores';

const store = Store.create({});
const state = localStorage.getItem('state');
const draggingStore = DraggingStore.create({}, { store });

if (state) {
  applySnapshot(store, JSON.parse(state));
}

onSnapshot(store, snapshot => {
  localStorage.setItem('state', JSON.stringify(snapshot));
});

ReactDOM.render(
  <Provider store={store}>
    <DragDropContext onDragEnd={draggingStore.onDragEnd}>
      <App />
    </DragDropContext>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
