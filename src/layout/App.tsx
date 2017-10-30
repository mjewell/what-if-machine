import * as React from 'react';

import CategoriesList from '../containers/CategoriesList';
import Graph from '../containers/Graph';
import OverviewTable from '../containers/OverviewTable';
import SelectedCategory from '../containers/SelectedCategory';
import Header from '../presenters/Header';

export default function App() {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <CategoriesList />
        <SelectedCategory />
      </div>
      {<Graph />}
      {<OverviewTable />}
    </div>
  );
}
