import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import EveryBranch, { IValue as IEveryBranchValue } from './EveryBranch';
import OnBranch, { IValue as IOnBranchValue } from './OnBranch';

type IState = {
  onBranch: IOnBranchValue;
  everyBranch: IEveryBranchValue;
};

export type IValue = {
  type: 'on' | 'every';
  data: IOnBranchValue | IEveryBranchValue;
};

type IProps = {
  value: IValue;
  onChange(val: IValue): void;
};

export default class Recurrence extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { data, type } = this.props.value;
    if (type === 'on') {
      this.state = {
        onBranch: data as IOnBranchValue,
        everyBranch: {
          period: 'days',
          count: 1,
          timespan: { startDate: null, type: 'never' }
        }
      };
    } else {
      this.state = {
        onBranch: null,
        everyBranch: data as IEveryBranchValue
      };
    }
  }

  setType = (e: any) => {
    const { onChange, value } = this.props;
    const type = e.target.value;
    const { onBranch, everyBranch } = this.state;
    const data = type === 'on' ? onBranch : everyBranch;

    onChange({
      ...value,
      type,
      data
    });
  };

  setData = (data: IOnBranchValue | IEveryBranchValue) => {
    const { onChange, value } = this.props;
    const { type } = value;

    if (type === 'on') {
      this.setState({
        onBranch: data as IOnBranchValue
      });
    } else {
      this.setState({
        everyBranch: data as IEveryBranchValue
      });
    }

    onChange({
      ...value,
      data
    });
  };

  renderNextStep = () => {
    const { data, type } = this.props.value;

    if (type === 'on') {
      return (
        <OnBranch value={data as IOnBranchValue} onChange={this.setData} />
      );
    } else {
      return (
        <EveryBranch
          value={data as IEveryBranchValue}
          onChange={this.setData}
        />
      );
    }
  };

  render() {
    const { type } = this.props.value;

    return (
      <FormGroup>
        <FormControl
          componentClass="select"
          onChange={this.setType}
          value={type}
          className="mr-2"
        >
          <option value="on">on...</option>
          <option value="every">every...</option>
        </FormControl>
        {this.renderNextStep()}
      </FormGroup>
    );
  }
}
