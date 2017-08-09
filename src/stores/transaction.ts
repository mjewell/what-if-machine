import * as later from 'later';
import { toJS } from 'mobx';
import { IType, types } from 'mobx-state-tree';
import * as moment from 'moment';

const JSONValue = types.union(
  types.string,
  types.number,
  types.boolean,
  types.literal(null),
  types.late(() => JSONMap),
  types.late(() => JSONArray)
);

const JSONMap: IType<any, any> = types.map(JSONValue);

const JSONArray: IType<any, any> = types.array(JSONValue);

const JSONType: IType<any, any> = types.union(JSONMap, JSONArray);

export const Transaction = types.model(
  'Transaction',
  {
    id: types.identifier(),
    name: types.string,
    amount: types.number,
    scheduleData: JSONType,
    get schedule() {
      return later.schedule(toJS(this.scheduleData));
    }
  },
  {
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
