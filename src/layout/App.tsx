import * as React from 'react';

import CategoriesList from '../containers/CategoriesList';
import SelectedCategory from '../containers/SelectedCategory';
import Header from '../presenters/Header';

// import Graph from './Graph';
// import OverviewTable from './OverviewTable';

export default function App() {
  return (
    <div>
      <Header />
      <div className="d-flex">
        <CategoriesList />
        <SelectedCategory />
      </div>
      {/* <Graph /> */}
      {/* <OverviewTable /> */}
    </div>
  );
}
