import { types } from 'mobx-state-tree';
import * as moment from 'moment';

export const FiltersStore = types.model('FiltersStore', {
  startDate: types.optional(types.Date, () => new Date()),
  endDate: types.optional(types.Date, () => moment().add(1, 'year').toDate())
});
