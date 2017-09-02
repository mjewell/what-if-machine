import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';

function generateStyles(amount: number, isSubtotal: boolean): any {
  const styles = { fontWeight: isSubtotal ? 'bold' : 'normal' };

  if (amount > 0) {
    return { color: 'green', ...styles };
  }

  if (amount < 0) {
    return { color: 'red', ...styles };
  }

  return styles;
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
      <td style={generateStyles(0, isSubtotal)}>{name}</td>
      <td style={generateStyles(before, isSubtotal)}>{before}</td>
      <td style={generateStyles(during, isSubtotal)}>{during}</td>
      <td style={generateStyles(total, isSubtotal)}>{total}</td>
    </tr>
  );
}
