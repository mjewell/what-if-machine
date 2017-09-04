import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';

function generateClassNames(amount: number, isSubtotal: boolean): string {
  let classNames = ['align-middle'];

  if (isSubtotal) {
    classNames.push('font-weight-bold');
  }

  if (amount > 0) {
    classNames.push('text-success');
  } else if (amount < 0) {
    classNames.push('text-danger');
  }

  return classNames.join(' ');
}
export default function Row({
  id,
  name,
  before,
  during,
  total,
  isSubtotal
}: any) {
  return (
    <tr>
      <td className={generateClassNames(0, isSubtotal)}>{name}</td>
      <td className={generateClassNames(before, isSubtotal)}>{before}</td>
      <td className={generateClassNames(during, isSubtotal)}>{during}</td>
      <td className={generateClassNames(total, isSubtotal)}>{total}</td>
    </tr>
  );
}
