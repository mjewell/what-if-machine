import { getRoot, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import { DateOnly } from '../../utilities/DateOnly';

export const GraphStore = types.model('GraphStore').views(self => ({
  get timeSeries() {
    const store = getRoot(self) as IStore;
    const { transactionsStore, filtersStore } = store;
    const { startDate, endDate } = filtersStore;
    const { generateDailyAmounts } = transactionsStore;

    return generateDailyAmounts(
      new DateOnly(startDate).dateTime,
      new DateOnly(endDate).dateTime
    );
  }
}));
