import * as React from 'react';

import CategoriesList from '../CategoriesList';
import Graph from '../Graph';
import Header from '../../presenters/Header';
import OverviewTable from '../OverviewTable';
import SelectedCategory from '../SelectedCategory';

const logo = require('../../logo.svg');

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Header />
        <CategoriesList />
        <SelectedCategory />
        <Graph />
        <OverviewTable />
      </div>
    );
  }
}

export default App;
