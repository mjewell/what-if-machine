import * as moment from 'moment';
import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import AfterBranch, { IValue as IAfterBranchValue } from './AfterBranch';
import OnBranch, { IValue as IOnBranchValue } from './OnBranch';
import withBranchStates from './withBranchStates';

export type IValue = {
  type: 'never' | 'on' | 'after';
  data: IOnBranchValue | IAfterBranchValue;
};

type IProps = {
  minDate?: moment.Moment | null;
  value: IValue;
  onChange(val: IValue): void;
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

    setData = (data: IOnBranchValue | IAfterBranchValue) => {
      const { onChange, value } = this.props;

      onChange({
        ...value,
        data
      });
    };

    renderNextStep = () => {
      const { minDate } = this.props;
      const { data, type } = this.props.value;

      if (type === 'on') {
        return (
          <OnBranch
            value={data as IOnBranchValue}
            onChange={this.setData}
            minDate={minDate}
          />
        );
      } else if (type === 'after') {
        return (
          <AfterBranch
            value={data as IAfterBranchValue}
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
