import * as React from 'react';

import Cell from './Cell';

export type IProps = {
  name: string;
  before: number;
  during: number;
  total: number;
  isSubtotal: boolean;
};

export default function Row({
  name,
  before,
  during,
  total,
  isSubtotal
}: IProps) {
  return (
    <tr>
      <Cell val={0} name={name} isSubtotal={isSubtotal} />
      <Cell val={before} isSubtotal={isSubtotal} />
      <Cell val={during} isSubtotal={isSubtotal} />
      <Cell val={total} isSubtotal={isSubtotal} />
    </tr>
  );
}
