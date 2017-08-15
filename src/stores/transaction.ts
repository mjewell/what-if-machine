import * as later from 'later';
import { toJS } from 'mobx';
import { types } from 'mobx-state-tree';

import { JSONType } from '../types/json';

type IOccurrenceData = {
  [key: number]: ITransaction;
};

export const Transaction = types.model(
  'Transaction',
  {
    id: types.identifier(),
    name: types.string,
    amount: types.number,
    scheduleData: JSONType,
    get schedule() {
      return later.schedule(toJS(this.scheduleData));
    },
    getOccurrences(startDate: Date, endDate: Date): IOccurrenceData {
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
    // fix this when mobx-state-tree has a solution
    // tslint:disable-next-line
    postProcessSnapshot(snapshot: any): any {
      const schedule = snapshot.scheduleData;
      return {
        ...snapshot,
        scheduleData: {
          schedules: schedule.schedules,
          exceptions: schedule.exceptions
        }
      };
    }
  }
);

export type ITransaction = typeof Transaction.Type;
