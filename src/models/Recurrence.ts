import { types } from 'mobx-state-tree';

export const TOnRecurrenceData = types.maybe(types.Date);
export type IOnRecurrenceData = typeof TOnRecurrenceData.Type;

export const TOnRecurrence = types.model('OnRecurrence', {
  type: types.literal('on'),
  data: TOnRecurrenceData
});

export const TPeriod = types.union(
  types.literal('days'),
  types.literal('weeks'),
  types.literal('months'),
  types.literal('years')
);

export const TNeverEndingData = types.null;
export type INeverEndingData = typeof TNeverEndingData.Type;

export const TNeverEnding = types.model('NeverEnding', {
  type: types.literal('never'),
  data: TNeverEndingData
});

export const TOnEndingData = types.maybe(types.Date);
export type IOnEndingData = typeof TOnEndingData.Type;

export const TOnEnding = types.model('OnEnding', {
  type: types.literal('on'),
  data: TOnEndingData
});

export const TAfterEndingData = types.union(types.string, types.number);
export type IAfterEndingData = typeof TAfterEndingData.Type;

export const TAfterEnding = types.model('AfterEnding', {
  type: types.literal('after'),
  data: TAfterEndingData
});

export const TEndingData = types.union(
  TNeverEndingData,
  TOnEndingData,
  TAfterEndingData
);
export type IEndingData = typeof TEndingData.Type;

export const TEnding = types.union(TNeverEnding, TOnEnding, TAfterEnding);
export type IEnding = typeof TEnding.Type;

export const TEveryRecurrenceData = types.model('EveryRecurrenceData', {
  count: types.union(types.string, types.number),
  period: TPeriod,
  startDate: types.maybe(types.Date),
  ending: TEnding
});
export type IEveryRecurrenceData = typeof TEveryRecurrenceData.Type;

export const TEveryRecurrence = types.model('EveryRecurrence', {
  type: types.literal('every'),
  data: TEveryRecurrenceData
});

export const TRecurrence = types.union(TOnRecurrence, TEveryRecurrence);
export type IRecurrence = typeof TRecurrence.Type;
