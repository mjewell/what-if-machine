import './styles.css';

import * as React from 'react';

import Categories from '../Categories';
import Graph from '../Graph';
import OverviewTable from '../OverviewTable';
import Transactions from '../Transactions';

const logo = require('../../logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>What-If Machine</h2>
        </div>
        <Categories />
        <Graph />
        <OverviewTable />
      </div>
    );
  }
}

export default App;
