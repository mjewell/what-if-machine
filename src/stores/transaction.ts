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
    recurrence: TRecurrence,
    get amount() {
      return +this.amountStr || 0;
    },
    get schedule() {
      const laterRecurrence = toLater(this.recurrence);

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
    },
    getOccurrencesArray(rangeEndDate: Date): Date[] {
      if (!this.schedule || !this.amount) {
        return [];
      }

      if (this.recurrence.type === 'on') {
        return wrapWithArray(this.schedule.next(1, minDate));
      }

      const data = this.recurrence.data as IEveryRecurrenceData;
      const startDate = data.startDate!;
      const ending = data.ending;

      if (ending.type === 'never') {
        return this.schedule.next(-1, startDate, rangeEndDate);
      }

      if (ending.type === 'on') {
        const endDate = ending.data as Date;
        const upToDate = endDate < rangeEndDate ? endDate : rangeEndDate;
        return this.schedule.next(-1, startDate, upToDate);
      }

      return this.schedule.next(ending.data as number, startDate, rangeEndDate);
    },
    getOccurrences(startDate: Date, endDate: Date): IOccurrenceData {
      const occurrencesArray = this.getOccurrencesArray(endDate);

      return occurrencesArray.reduce(
        (obj, occurrence) => {
          if (occurrence < startDate) {
            return {
              ...obj,
              before: obj.before + this.amount
            };
          }

          return {
            ...obj,
            [occurrence.getTime()]: this.amount
          };
        },
        {
          before: 0
        }
      );
    }
  },
  {
    setName(name: string) {
      this.name = name;
    },
    setAmount(amount: number | string) {
      this.amountStr = amount;
    },
    setRecurrence(recurrence: IRecurrence) {
      this.recurrence = recurrence;
    }
  }
);

export type ITransaction = typeof Transaction.Type;
