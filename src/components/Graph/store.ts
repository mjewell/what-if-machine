import { sumBy } from 'lodash';
import { getEnv, types } from 'mobx-state-tree';

import { IStore } from '../../stores';
import { DateOnly } from '../../utilities/DateOnly';

export const GraphStore = types.model('GraphStore').views(self => ({
  get asProps() {
    const store = getEnv(self).store as IStore;
    const { transactionsStore, filtersStore } = store;
    const { startDate, endDate } = filtersStore;
    const { generateDailyAmounts } = transactionsStore;

    return {
      timeSeries: generateDailyAmounts(
        new DateOnly(startDate).dateTime,
        new DateOnly(endDate).dateTime
      )
    };
  }
}));
