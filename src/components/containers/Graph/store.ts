import { getRoot, types } from 'mobx-state-tree';

import { IStore } from '../../../stores';
import { DateOnly } from '../../../utilities/DateOnly';

export const GraphStore = types.model('GraphStore').views(self => ({
  get timeSeries() {
    const store = getRoot(self) as IStore;
    const { transactions, filters } = store;
    const { startDate, endDate } = filters;
    const { generateDailyAmounts } = transactions;

    return generateDailyAmounts(
      new DateOnly(startDate).dateTime,
      new DateOnly(endDate).dateTime
    );
  }
}));
