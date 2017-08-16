import * as later from 'later';
import { types } from 'mobx-state-tree';

import { toLater } from '../utilities/convertRecurrence';
import { IRecurrence, TRecurrence } from './types/recurrence';

type IOccurrenceData = {
  [key: number]: ITransaction;
};

export const Transaction = types.model(
  'Transaction',
  {
    id: types.identifier(),
    name: types.string,
    amount: types.number,
    recurrence: TRecurrence,
    get schedule() {
      const laterRecurrence = toLater(this.recurrence);
      return laterRecurrence && later.schedule(laterRecurrence.schedule);
    },
    getOccurrences(startDate: Date, endDate: Date): IOccurrenceData {
      if (!this.schedule) {
        return {};
      }

      const occurrencesArray = this.schedule.next(-1, startDate, endDate);

      if (!occurrencesArray) {
        return {};
      }

      return occurrencesArray.reduce((obj, occurrence) => {
        return {
          ...obj,
          [occurrence.getTime()]: this
        };
      }, {});
    }
  },
  {
    setName(name: string) {
      this.name = name;
    },
    setAmount(amount: number) {
      this.amount = amount;
    },
    setRecurrence(recurrence: IRecurrence) {
      this.recurrence = recurrence;
    }
  }
);

export type ITransaction = typeof Transaction.Type;
