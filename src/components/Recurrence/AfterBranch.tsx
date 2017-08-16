import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import { IAfterEndingData } from '../../types/recurrence';

type IProps = {
  value: IAfterEndingData;
  onChange(count: IAfterEndingData): void;
};

export default class AfterBranch extends React.Component<IProps> {
  onChange = (e: any) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const { value } = this.props;

    return (
      <FormGroup>
        <FormControl
          type="number"
          min="1"
          placeholder="number"
          onChange={this.onChange}
          value={value}
          className="mx-2"
        />
        times
      </FormGroup>
    );
  }
}
