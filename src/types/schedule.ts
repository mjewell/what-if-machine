import * as later from 'later';
import * as moment from 'moment';

import { IEnding } from './recurrence';

export type IOnSchedule = {
  type: 'on';
  schedule: later.Recurrence[];
};

export type IEverySchedule = {
  type: 'every';
  schedule: later.Recurrence[];
  startDate: moment.Moment;
  ending: IEnding;
};

export type ISchedule = IOnSchedule | IEverySchedule;
