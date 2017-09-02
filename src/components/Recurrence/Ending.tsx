import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import {
  IAfterEndingData,
  IEnding,
  IEndingData,
  IOnEndingData
} from '../../types/recurrence';
import AfterBranch from './AfterBranch';
import OnBranch from './OnBranch';
import withBranchStates from './withBranchStates';

type IProps = {
  minDate?: Date | null;
  value: IEnding;
  onChange(val: IEnding): void;
};

export default withBranchStates({
  defaultStates: {
    never: null,
    on: null,
    after: 10
  }
})(
  class Ending extends React.Component<IProps> {
    setType = (e: any) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        type: e.target.value
      });
    };

    setData = (data: IEndingData) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        data: data as any
      });
    };

    renderNextStep = () => {
      const { minDate } = this.props;
      const { data, type } = this.props.value;

      if (type === 'on') {
        return (
          <OnBranch
            value={data as IOnEndingData}
            onChange={this.setData}
            minDate={minDate}
          />
        );
      } else if (type === 'after') {
        return (
          <AfterBranch
            value={data as IAfterEndingData}
            onChange={this.setData}
          />
        );
      }

      return null;
    };

    render() {
      const { type } = this.props.value;

      return (
        <FormGroup className="ml-2">
          and ending
          <FormControl
            componentClass="select"
            onChange={this.setType}
            value={type}
            className="ml-2"
          >
            <option value="never">never</option>
            <option value="on">on...</option>
            <option value="after">after...</option>
          </FormControl>
          {this.renderNextStep()}
        </FormGroup>
      );
    }
  }
);
