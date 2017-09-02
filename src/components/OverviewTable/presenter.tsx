import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';

function generateStyles(amount: number, totals: boolean): any {
  const totalsStyle = { fontWeight: totals ? 'bold' : 'normal' };

  if (amount > 0) {
    return { color: 'green', ...totalsStyle };
  }

  if (amount < 0) {
    return { color: 'red', ...totalsStyle };
  }

  return totalsStyle;
}

function createRow(
  { id, name, before, during, total }: any,
  totals: boolean = false
) {
  return (
    <tr key={id}>
      <td style={generateStyles(0, totals)}>{name}</td>
      <td style={generateStyles(before, totals)}>{before}</td>
      <td style={generateStyles(during, totals)}>{during}</td>
      <td style={generateStyles(total, totals)}>{total}</td>
    </tr>
  );
}

export default function OverviewTable(props: any) {
  const { transactionTotals } = props;
  const rows = transactionTotals.map((d: any) => createRow(d));

  const totalsData = transactionTotals.reduce(
    (totals: any, { before, during, total }: any) => ({
      before: totals.before + before,
      during: totals.during + during,
      total: totals.total + total
    }),
    {
      before: 0,
      during: 0,
      total: 0
    }
  );

  const totalsRow = createRow(
    {
      id: 'totals',
      name: 'Total',
      ...totalsData
    },
    true
  );

  return (
    <Table responsive style={{ width: 500 }}>
      <thead>
        <tr>
          <th>Transaction</th>
          <th>Before Period</th>
          <th>During Period</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {rows}
        {totalsRow}
      </tbody>
    </Table>
  );
}
