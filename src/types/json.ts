import { IType, types } from 'mobx-state-tree';

export const JSONValue = types.union(
  types.string,
  types.number,
  types.boolean,
  types.literal(null),
  types.late(() => JSONMap),
  types.late(() => JSONArray)
);

export const JSONMap: IType<{}, {}> = types.map(JSONValue);

export const JSONArray: IType<{}, {}> = types.array(JSONValue);

export const JSONType: IType<{}, {}> = types.union(JSONMap, JSONArray);
