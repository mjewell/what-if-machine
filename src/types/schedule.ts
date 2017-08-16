import * as later from 'later';
import * as moment from 'moment';

import { IEnding } from './recurrence';

export type IOnSchedule = {
  type: 'on';
  schedule: later.RecurrenceBuilder;
};

export type IEverySchedule = {
  type: 'every';
  schedule: later.RecurrenceBuilder;
  startDate: Date;
  ending: IEnding;
};

export type ISchedule = IOnSchedule | IEverySchedule;
