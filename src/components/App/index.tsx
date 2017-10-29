import * as React from 'react';

import CategoriesList from '../../containers/CategoriesList';
import Header from '../../presenters/Header';
import Graph from '../Graph';
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
