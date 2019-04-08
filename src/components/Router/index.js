import React from 'react';
import { Router, Link } from '@reach/router';
import AccountsNew from '../Accounts/New';

let Dash = () => (
  <div>
    <h1>Dash</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);

export default () => (
  <Router>
    <AccountsNew path="/" />
    <Dash path="dashboard" />
  </Router>
);
