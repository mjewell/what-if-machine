import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { localPoint } from '@vx/event';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { AreaClosed, Bar } from '@vx/shape';
import { bisector, extent, max } from 'd3-array';
import * as moment from 'moment';
import * as React from 'react';

import { IStore } from '../../stores';
import { ITimeSeriesData } from '../../stores/transactions';

type Props = {
  store: IStore;
};

const xAccessor = (d: ITimeSeriesData) => d.date;
const yAccessor = (d: ITimeSeriesData) => d.amount;
const bisectDate = bisector(xAccessor).left;

export default class Graph extends React.Component<Props, {}> {
  svg: any;

  generateTimeSeries = () => {
    const { generateTimeSeries } = this.props.store.transactions;
    return generateTimeSeries(new Date(), moment().add(1, 'year').toDate());
  };

  render() {
    const data = this.generateTimeSeries();
    const width = 1000;
    const height = 500;
    const margin = {
      left: 60,
      right: 20,
      top: 20,
      bottom: 60
    };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, xAccessor)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, (max(data, yAccessor) || 0) + yMax / 3],
      nice: true
    });

    const hideTooltip = () => {};
    const showTooltip = (x: any) => {};

    return (
      <svg ref={s => (this.svg = s)} width={width} height={height}>
        <rect
          x={margin.left}
          y={margin.top}
          width={xMax}
          height={yMax}
          fill="#222"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <GridRows
          lineStyle={{ pointerEvents: 'none' }}
          scale={yScale}
          left={margin.left}
          top={margin.top}
          width={xMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.2)"
        />
        <GridColumns
          lineStyle={{ pointerEvents: 'none' }}
          scale={xScale}
          left={margin.left}
          top={margin.top}
          height={yMax}
          strokeDasharray="2,2"
          stroke="rgba(255,255,255,0.2)"
        />
        <Group top={margin.top} left={margin.left}>
          <AreaClosed
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xAccessor}
            y={yAccessor}
            strokeWidth={1}
            stroke="url(#gradient)"
            fill="url(#gradient)"
            curve={curveMonotoneX}
          />
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={yScale}
          hideZero
          label={
            <text
              fill="#8e205f"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
            >
              Amount ($)
            </text>
          }
          stroke="#1b1a1e"
          tickLabelComponent={
            <text
              fill="#8e205f"
              textAnchor="end"
              fontSize={10}
              fontFamily="Arial"
              dx="-0.25em"
              dy="0.25em"
            />
          }
        />
        <AxisBottom
          top={height - margin.bottom}
          left={margin.left}
          scale={xScale}
          label={
            <text
              fill="#8e205f"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
            >
              Date
            </text>
          }
          stroke={'#1b1a1e'}
          tickStroke={'#1b1a1e'}
          tickLabelComponent={
            <text
              fill="#8e205f"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
              dy="0.25em"
            />
          }
        />
        <Bar
          x={0}
          y={0}
          width={width}
          height={height}
          fill="transparent"
          rx={14}
          data={data}
          onMouseLeave={() => () => hideTooltip()}
          onMouseMove={() => (event: any) => {
            const { x } = localPoint(this.svg, event);
            const x0 = xScale.invert(x);
            const index = bisectDate(data, x0, 1);
            const d0 = data[index - 1];
            const d1 = data[index];
            let d = d0;
            if (d1 && d1.date) {
              d =
                x0 - xAccessor(d0).getTime() > xAccessor(d1).getTime() - x0
                  ? d1
                  : d0;
            }
            showTooltip({
              tooltipData: d,
              tooltipLeft: x,
              tooltipTop: yScale(d.amount)
            });
          }}
        />
      </svg>
    );
  }
}
