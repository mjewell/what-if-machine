import * as moment from 'moment';
import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

export type IValue = {
  count: string | number;
};

type IProps = {
  value: IValue;
  onChange(date: IValue): void;
};

export default class AfterBranch extends React.Component<IProps> {
  setCount = (e: any) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      count: e.target.value
    });
  };

  render() {
    const { count } = this.props.value;

    return (
      <FormGroup>
        <FormControl
          type="number"
          min="1"
          placeholder="number"
          onChange={this.setCount}
          value={count}
          className="mr-2"
        />
        times
      </FormGroup>
    );
  }
}
