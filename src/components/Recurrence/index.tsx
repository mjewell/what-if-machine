import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import {
  IEveryRecurrenceData,
  IOnRecurrenceData,
  IRecurrence
} from '../../types/Recurrence';
import EveryBranch from './EveryBranch';
import OnBranch from './OnBranch';
import withBranchStates from './withBranchStates';

type IProps = {
  value: IRecurrence;
  onChange(val: IRecurrence): void;
};

export default withBranchStates({
  defaultStates: {
    on: null,
    every: {
      period: 'days',
      count: 1,
      startDate: null,
      ending: {
        type: 'never',
        data: null
      }
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

    setData = (data: IOnRecurrenceData | IEveryRecurrenceData) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        data: data as any
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
