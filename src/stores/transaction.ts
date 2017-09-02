import { types } from 'mobx-state-tree';

import { toRRule } from '../utilities/convertRecurrence';
import { IEveryRecurrenceData, IRecurrence } from './types/recurrence';

type IOccurrenceData = {
  [key: number]: number;
  before: number;
};

const minDate = new Date('2000/01/01');

export const Transaction = types
  .model('Transaction', {
    id: types.identifier(),
    name: types.optional(types.string, ''),
    amountStr: types.optional(types.union(types.number, types.string), 0),
    // TODO: set this to TRecurrence when mobx state tree cache issue is fixed
    recurrence: types.optional(types.frozen, () => ({
      type: 'on',
      data: new Date()
    }))
  })
  .views(self => ({
    get amount() {
      return +self.amountStr || 0;
    },
    get schedule() {
      return toRRule(self.recurrence);
    }
  }))
  .views(self => ({
    getOccurrencesArray(rangeEndDate: Date): Date[] {
      if (!self.schedule || !self.amount) {
        return [];
      }

      return self.schedule.between(
        self.recurrence.data.startDate || minDate,
        rangeEndDate,
        true
      );
    }
  }))
  .views(self => ({
    getOccurrences(startDate: Date, endDate: Date): IOccurrenceData {
      const occurrencesArray = self.getOccurrencesArray(endDate);

      return occurrencesArray.reduce(
        (obj, occurrence) => {
          if (occurrence < startDate) {
            return {
              ...obj,
              before: obj.before + self.amount
            };
          }

          return {
            ...obj,
            [occurrence.getTime()]: self.amount
          };
        },
        {
          before: 0
        }
      );
    }
  }))
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setAmount(amount: number | string) {
      self.amountStr = amount;
    },
    setRecurrence(recurrence: IRecurrence) {
      self.recurrence = recurrence;
    }
  }));

export type ITransaction = typeof Transaction.Type;
