import * as moment from 'moment';
import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import DatePicker from '../DatePicker';
import AfterBranch, { IValue as IAfterBranchValue } from './AfterBranch';
import OnBranch, { IValue as IOnBranchValue } from './OnBranch';
import withBranchStates from './withBranchStates';

export type IValue = {
  startDate: Date | moment.Moment | null;
  type: 'never' | 'on' | 'after';
  data: IOnBranchValue | IAfterBranchValue;
};

type IProps = {
  value: IValue;
  onChange(val: IValue): void;
};

export default withBranchStates({
  defaultStates: {
    never: null,
    on: null,
    after: {
      count: 10
    }
  }
})(
  class Timespan extends React.Component<IProps> {
    setStartDate = (date: moment.Moment | null) => {
      const { onChange, value } = this.props;
      onChange({
        ...value,
        startDate: date
      });
    };

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
      const { data, type } = this.props.value;

      if (type === 'on') {
        return (
          <OnBranch value={data as IOnBranchValue} onChange={this.setData} />
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
      const { startDate, type } = this.props.value;

      return (
        <FormGroup>
          starting on
          <FormGroup className="mx-2">
            <DatePicker date={startDate} onDateChange={this.setStartDate} />
          </FormGroup>
          and ending
          <FormControl
            componentClass="select"
            onChange={this.setType}
            value={type}
            className="mx-2"
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
