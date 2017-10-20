import { get } from 'lodash';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

export default (ComponentStoreClass: any) => (WrappedComponent: any) => {
  return inject('store')(
    observer(
      class extends React.Component<{ store: any }, {}> {
        store: any;

        componentWillMount() {
          this.store = ComponentStoreClass.create(
            {},
            { store: this.props.store }
          );
        }

        render() {
          const storeProps = {
            ...this.store.asProps,
            ...(this.store.fromProps && this.store.fromProps(this.props))
          };

          return <WrappedComponent {...this.props} {...storeProps} />;
        }
      }
    )
  );
};
