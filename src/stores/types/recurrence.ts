import { types } from 'mobx-state-tree';

export const TOnRecurrence = types.model('OnRecurrence', {
  type: types.literal('on'),
  data: types.maybe(types.Date)
});

export const TPeriod = types.union(
  types.literal('days'),
  types.literal('weeks'),
  types.literal('months'),
  types.literal('years')
);

export const TNeverEnding = types.model('NeverEnding', {
  type: types.literal('never'),
  data: types.null
});

export const TOnEnding = types.model('OnEnding', {
  type: types.literal('on'),
  data: types.maybe(types.Date)
});

export const TAfterEnding = types.model('AfterEnding', {
  type: types.literal('after'),
  data: types.union(types.string, types.number)
});

export const TEnding = types.union(TNeverEnding, TOnEnding, TAfterEnding);

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
