import './styles.css';

import * as React from 'react';

const logo = require('../../../logo.svg');

export default function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>What-If Machine</h1>
    </header>
  );
}
