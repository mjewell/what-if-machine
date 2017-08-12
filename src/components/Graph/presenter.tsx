import * as moment from 'moment';
import * as React from 'react';
import { LineChart } from 'react-d3-basic';

import { IStore } from '../../stores';
import { ITransaction } from '../../stores/transaction';
import { ITimeSeriesData } from '../../stores/transactions';

type Props = {
  store: IStore;
};

export default class Graph extends React.Component<Props, {}> {
  render() {
    const { generateTimeSeries } = this.props.store.transactions;
    return (
      <LineChart
        chartSeries={[
          {
            field: 'amount',
            name: 'Amount',
            color: '#01579B'
          }
        ]}
        data={generateTimeSeries(new Date(), moment().add(1, 'year').toDate())}
        x={(d: ITimeSeriesData) => d.date}
        xScale="time"
      />
    );
  }
}
