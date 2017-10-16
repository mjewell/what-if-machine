import { get } from 'lodash';
import { inject } from 'mobx-react';

export type ComponentStore = {
  asProps?: {};
  fromProps(props: any): {};
};

export type ComponentsStore = {
  [key: string]: ComponentStore;
};

export default (storeName: string) =>
  inject(({ componentsStore }: { componentsStore: ComponentsStore }, props) => {
    const store = get(componentsStore, storeName) as ComponentStore;

    return {
      ...store.asProps,
      ...(store.fromProps && store.fromProps(props))
    };
  });
