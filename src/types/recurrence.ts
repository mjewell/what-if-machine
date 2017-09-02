import * as moment from 'moment';

export type IOnRecurrenceData = Date | null;

export type IOnRecurrence = {
  type: 'on';
  data: IOnRecurrenceData;
};

export type IPeriod = 'days' | 'weeks' | 'months' | 'years';

export type INeverEndingData = null;

export type INeverEnding = {
  type: 'never';
  data: INeverEndingData;
};

export type IOnEndingData = Date | null;

export type IOnEnding = {
  type: 'on';
  data: IOnEndingData;
};

export type IAfterEndingData = string | number;

export type IAfterEnding = {
  type: 'after';
  data: IAfterEndingData;
};

export type IEndingData = INeverEndingData | IOnEndingData | IAfterEndingData;

export type IEnding = INeverEnding | IOnEnding | IAfterEnding;

export type IEveryRecurrenceData = {
  count: string | number;
  period: IPeriod;
  startDate: IOnEndingData;
  ending: IEnding;
};

export type IEveryRecurrence = {
  type: 'every';
  data: IEveryRecurrenceData;
};

export type IRecurrence = IOnRecurrence | IEveryRecurrence;
