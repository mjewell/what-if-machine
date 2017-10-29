import * as React from 'react';

import CategoriesList from '../../containers/CategoriesList';
import SelectedCategory from '../../containers/SelectedCategory';
import Header from '../../presenters/Header';
import Graph from '../Graph';
import OverviewTable from '../OverviewTable';

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
