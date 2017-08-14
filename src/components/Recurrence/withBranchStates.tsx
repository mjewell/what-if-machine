import * as React from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

import EveryBranch, { IValue as IEveryBranchValue } from './EveryBranch';
import OnBranch, { IValue as IOnBranchValue } from './OnBranch';

export default <T extends {}>({ defaultStates }: { defaultStates: T }) => {
  type IValue = {
    type: keyof T;
    data: any;
  };

  type IProps = {
    value: IValue;
    onChange(val: IValue): void;
    [key: string]: any;
  };

  return (WrappedComponent: React.ComponentClass<any>) =>
    class WithBranchStates extends React.Component<IProps, T> {
      constructor(props: IProps) {
        super(props);

        const { data, type } = this.props.value;

        this.state = { ...defaultStates as any, [type]: data };
      }

      onChange = (newValue: IValue) => {
        const { onChange, value } = this.props;

        if (newValue.type !== value.type) {
          return onChange({
            ...newValue,
            data: this.state[newValue.type]
          });
        }

        if (newValue.data !== value.data) {
          this.setState({
            [newValue.type as any]: newValue.data
          });
        }

        onChange(newValue);
      };

      render() {
        return <WrappedComponent {...this.props} onChange={this.onChange} />;
      }
    };
};
