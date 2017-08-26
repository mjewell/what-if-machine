import * as later from 'later';
import { types } from 'mobx-state-tree';

import { toLater } from '../utilities/convertRecurrence';
import {
  IEveryRecurrenceData,
  IRecurrence,
  TRecurrence
} from './types/recurrence';

type IOccurrenceData = {
  [key: number]: number;
  before: number;
};

const wrapWithArray = (x: any) => (Array.isArray(x) ? x : [x]);
const minDate = new Date('2000/01/01');

export const Transaction = types.model(
  'Transaction',
  {
    id: types.identifier(),
    name: types.string,
    amountStr: types.union(types.number, types.string),
    recurrence: TRecurrence
  }
).views(self => ({
  get amount() {
    return +self.amountStr || 0;
  },
  get schedule() {
    const laterRecurrence = toLater(self.recurrence);
    
    if (!laterRecurrence) {
      return null;
    }
    
    if (laterRecurrence.type === 'every') {
      const { type, data } = laterRecurrence.ending;
      if (!data && type !== 'never') {
        return null;
      }
    }
    
    return later.schedule(laterRecurrence.schedule);
  }
})).views(self => ({
  getOccurrencesArray(rangeEndDate: Date): Date[] {
    if (!self.schedule || !self.amount) {
      return [];
    }
    
    if (self.recurrence.type === 'on') {
      return wrapWithArray(self.schedule.next(1, minDate));
    }
    
    const data = self.recurrence.data as IEveryRecurrenceData;
    const startDate = data.startDate!;
    const ending = data.ending;
    
    if (ending.type === 'never') {
      return self.schedule.next(-1, startDate, rangeEndDate);
    }
    
    if (ending.type === 'on') {
      const endDate = ending.data as Date;
      const upToDate = endDate < rangeEndDate ? endDate : rangeEndDate;
      return self.schedule.next(-1, startDate, upToDate);
    }
    
    return self.schedule.next(ending.data as number, startDate, rangeEndDate);
  }
})).views(self => ({
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
})).actions(self => ({
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
