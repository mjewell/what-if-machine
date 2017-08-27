import { types } from 'mobx-state-tree';
import * as moment from 'moment';

export const GraphStore = types.model('Graph', {
  startDate: types.optional(types.Date, () => new Date()),
  endDate: types.optional(types.Date, () => moment().add(1, 'year').toDate())
});
