import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import EveryBranch, { IValue as IEveryBranchValue } from './EveryBranch';
import OnBranch, { IValue as IOnBranchValue } from './OnBranch';
import withBranchStates from './withBranchStates';

export type IValue = {
  type: 'on' | 'every';
  data: IOnBranchValue | IEveryBranchValue;
};

type IProps = {
  value: IValue;
  onChange(val: IValue): void;
};

export default withBranchStates({
  defaultStates: {
    on: null,
    every: {
      period: 'days',
      count: 1,
      timespan: { startDate: null, type: 'never', data: null }
    }
  }
})(
  class Recurrence extends React.Component<IProps> {
    setType = (e: any) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        type: e.target.value
      });
    };

    setData = (data: IOnBranchValue | IEveryBranchValue) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        data
      });
    };

    renderNextStep = () => {
      const { data, type } = this.props.value;

      const Component = type === 'on' ? OnBranch : EveryBranch;

      return <Component value={data as any} onChange={this.setData} />;
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
);
