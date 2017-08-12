import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import EveryBranch from './EveryBranch';
import OnBranch from './OnBranch';

type IState = {
  type: 'on' | 'every';
};

export default class Recurrence extends React.Component<{}, IState> {
  state: IState = { type: 'every' };

  setType = (e: any) =>
    this.setState({
      type: e.target.value
    });

  render() {
    const { type } = this.state;

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
        <NextStep />
      </FormGroup>
    );
  }
}
