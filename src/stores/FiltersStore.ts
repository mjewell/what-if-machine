import { types } from 'mobx-state-tree';
import * as moment from 'moment';

import { DateOnly } from '../utilities/DateOnly';

export const FiltersStore = types.model('FiltersStore', {
  startDate: types.optional(types.Date, () => new DateOnly().dateTime),
  endDate: types.optional(
    types.Date,
    () => new DateOnly(moment().add(1, 'year')).dateTime
  )
});
