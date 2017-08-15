import * as later from 'later';
import * as moment from 'moment';

export type IOnRecurrence = {
  type: 'on';
  data: moment.Moment | null;
};

export type IPeriod = 'days' | 'weeks' | 'months' | 'years';

export type INeverEnding = {
  type: 'never';
  data: null;
};

export type IOnEnding = {
  type: 'on';
  data: moment.Moment | null;
};

export type IAfterEnding = {
  type: 'after';
  data: string | number;
};

export type IEnding = INeverEnding | IOnEnding | IAfterEnding;

export type IEveryRecurrence = {
  type: 'every';
  data: {
    count: string | number;
    period: IPeriod;
    startDate: moment.Moment | null;
    ending: IEnding;
  };
};

export type IRecurrence = IOnRecurrence | IEveryRecurrence;
