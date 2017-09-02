import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';
import Row from './Row';

export default function OverviewTable({ transactionTotals }: any) {
  const rows = transactionTotals.map((d: any, index: number) => (
    <Row
      key={d.id}
      {...d}
      isSubtotal={index === transactionTotals.length - 1}
    />
  ));

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
      <tbody>{rows}</tbody>
    </Table>
  );
}
