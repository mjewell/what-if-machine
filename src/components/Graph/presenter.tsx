import * as d3 from 'd3';
import * as moment from 'moment';
import * as React from 'react';

import { IStore } from '../../stores';
import { ITimeSeriesData } from '../../stores/transactions';

type Props = {
  store: IStore;
};

export default class Graph extends React.Component<Props, {}> {
  node: any;

  componentDidMount() {
    this.createBarChart();
  }

  componentWillReact() {
    this.createBarChart();
  }

  generateTimeSeries = () => {
    const { generateTimeSeries } = this.props.store.transactions;
    return generateTimeSeries(new Date(), moment().add(1, 'year').toDate());
  };

  createBarChart = () => {
    const data = this.generateTimeSeries();

    const svg = d3.select(this.node);
    svg.selectAll('*').remove();
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime().rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line().x((d: any) => x(d.date)).y((d: any) => y(d.amount));

    x.domain(
      d3.extent(data, (d: any) => {
        return d.date;
      })
    );

    y.domain(
      d3.extent(data, (d: any) => {
        return d.amount;
      })
    );

    g
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .select('.domain')
      .remove();

    g
      .append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Amount ($)');

    g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  render() {
    this.generateTimeSeries();
    return <svg ref={node => (this.node = node)} width={1000} height={500} />;
  }
}
