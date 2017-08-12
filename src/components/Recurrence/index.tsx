import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import EveryBranch from './EveryBranch';
import OnBranch from './OnBranch';

export type IState = {
  type: 'on' | 'every';
  nextStep: any;
};

type IProps = {
  onChange?(val: IState): void;
};

export default class Recurrence extends React.Component<IProps, IState> {
  state: IState = { type: 'every', nextStep: null };

  onChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state);
    }
  };

  setType = (e: any) => {
    this.setState(
      {
        type: e.target.value,
        nextStep: null
      },
      this.onChange
    );
  };

  setNextStep = (val: any) => {
    this.setState(
      {
        nextStep: val
      },
      this.onChange
    );
  };

  render() {
    const { type, nextStep } = this.state;

    const NextStep = type === 'on' ? OnBranch : EveryBranch;

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
        <NextStep value={nextStep} onChange={this.setNextStep} />
      </FormGroup>
    );
  }
}
