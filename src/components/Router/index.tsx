import React from 'react';
import { Router } from '@reach/router';
import AccountsNew from '../Accounts/New';

export default () => (
  <Router>
    <AccountsNew path="/" />
  </Router>
);
