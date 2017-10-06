import * as React from 'react';
import { Table } from 'react-bootstrap';

import { DateOnly } from '../../utilities/DateOnly';
import Row from './Row';
import { ITransactionTotal } from './store';

export type IProps = {
  transactionTotals: ITransactionTotal[];
};

export default function OverviewTable({ transactionTotals }: IProps) {
  const rows = transactionTotals.map((d, index) => (
    <Row
      key={d.id as string}
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
