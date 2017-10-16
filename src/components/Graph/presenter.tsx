import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { localPoint } from '@vx/event';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Bar, Line, LinePath } from '@vx/shape';
import { Tooltip } from '@vx/tooltip';
import { bisector, extent, max, min } from 'd3-array';
import * as React from 'react';

import { ITimeSeriesData } from '../../stores';

type Props = {
  timeSeries: {
    date: Date;
    amount: number;
  }[];
};

type State = {
  tooltipData: ITimeSeriesData | null;
  tooltipLeft: number;
  tooltipTop: number;
};

type ITooltipData = {
  data: ITimeSeriesData | null;
  left: number;
  top: number;
};

const xAccessor = (d: ITimeSeriesData) => d.date;
const yAccessor = (d: ITimeSeriesData) => d.amount;
const bisectDate = bisector(xAccessor).left;

export default class Graph extends React.Component<Props, State> {
  state: State = { tooltipData: null, tooltipLeft: 0, tooltipTop: 0 };
  svg: any;

  hideTooltip = () => {
    this.setState({
      tooltipData: null
    });
  };

  showTooltip = (tooltipData: ITooltipData) => {
    this.setState({
      tooltipData: tooltipData.data,
      tooltipLeft: tooltipData.left,
      tooltipTop: tooltipData.top
    });
  };

  formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  render() {
    const data = this.props.timeSeries;
    const width = 1000;
    const height = 500;
    const margin = {
      left: 90,
      right: 50,
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
      domain: [min(data, yAccessor) || 0, max(data, yAccessor) || 0],
      nice: true
    });

    const { tooltipData, tooltipLeft, tooltipTop } = this.state;

    return (
      <div style={{ width: width, height: height, position: 'relative' }}>
        <svg ref={s => (this.svg = s)} width={width} height={height}>
          <rect
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            fill="#FAFAFA"
          />
          <GridRows
            lineStyle={{ pointerEvents: 'none' }}
            scale={yScale}
            left={margin.left}
            top={margin.top}
            width={xMax}
            strokeDasharray="2,2"
            stroke="rgba(100,100,100,0.2)"
          />
          <GridColumns
            lineStyle={{ pointerEvents: 'none' }}
            scale={xScale}
            left={margin.left}
            top={margin.top}
            height={yMax}
            strokeDasharray="2,2"
            stroke="rgba(100,100,100,0.2)"
          />
          <Group top={margin.top} left={margin.left}>
            <LinePath
              data={data}
              xScale={xScale}
              yScale={yScale}
              x={xAccessor}
              y={yAccessor}
              strokeWidth={2}
              stroke="#000"
              curve={curveMonotoneX}
            />
          </Group>
          <AxisLeft
            top={margin.top}
            left={margin.left}
            scale={yScale}
            label={
              <text
                textAnchor="middle"
                fontSize={12}
                fontFamily="Arial"
                dy="-1em"
              >
                Amount ($)
              </text>
            }
            tickLabelComponent={
              <text
                textAnchor="end"
                fontSize={12}
                fontFamily="Arial"
                dx="-0.25em"
                dy="0.3em"
              />
            }
          />
          <AxisBottom
            top={height - margin.bottom}
            left={margin.left}
            scale={xScale}
            label={
              <text textAnchor="middle" fontSize={12} fontFamily="Arial">
                Date
              </text>
            }
            tickLabelComponent={
              <text
                textAnchor="middle"
                fontSize={12}
                fontFamily="Arial"
                dy="0.25em"
              />
            }
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            fill="transparent"
            rx={14}
            data={data}
            onMouseLeave={() => this.hideTooltip}
            onMouseMove={() => (event: any) => {
              const { x } = localPoint(this.svg, event);
              const x0 = xScale.invert(x - margin.left);
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
              this.showTooltip({
                data: d,
                left: x,
                top: yScale(d.amount) + margin.top
              });
            }}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: yMax + margin.top }}
                stroke="rgba(0, 0, 0, 1.000)"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
                strokeDasharray="2,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill="rgba(92, 119, 235, 1.000)"
                stroke="white"
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <Tooltip
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={{
                backgroundColor: 'rgba(92, 119, 235, 1.000)',
                color: 'white'
              }}
            >
              {`$${yAccessor(tooltipData)}`}
            </Tooltip>
            <Tooltip
              top={yMax - 14 + margin.top}
              left={tooltipLeft}
              style={{
                transform: 'translateX(-50%)'
              }}
            >
              {this.formatDate(xAccessor(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}
