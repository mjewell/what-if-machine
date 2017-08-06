import './styles.css';

import * as React from 'react';

const logo = require('../../logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>What-If Machine</h2>
        </div>
      </div>
    );
  }
}

export default App;
