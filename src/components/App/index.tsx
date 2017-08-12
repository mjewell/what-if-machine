import './styles.css';

import * as React from 'react';

import Graph from '../Graph';
import Transactions from '../Transactions';

const logo = require('../../logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>What-If Machine</h2>
        </div>
        <Transactions />
        <Graph />
      </div>
    );
  }
}

export default App;
