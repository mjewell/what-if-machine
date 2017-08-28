import * as React from 'react';
import { Table } from 'react-bootstrap';

function generateStyles(amount: number) {
  if (amount > 0) {
    return { color: 'green' };
  }

  if (amount < 0) {
    return { color: 'red' };
  }

  return {};
}

export default function OverviewTable(props: any) {
  const { transactionsStore, graphStore } = props.store;
  const { startDate, endDate } = graphStore;
  const { generateAmountData } = transactionsStore;
  const data = generateAmountData(startDate, endDate);

  const rows = data.map(({ id, name, before, during, total }: any) => {
    return (
      <tr key={id}>
        <td>
          {name}
        </td>
        <td style={generateStyles(before)}>
          {before}
        </td>
        <td style={generateStyles(during)}>
          {during}
        </td>
        <td style={generateStyles(total)}>
          {total}
        </td>
      </tr>
    );
  });

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
      </tbody>
    </Table>
  );
}
