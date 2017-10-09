import { inject } from 'mobx-react';

export type ComponentStore = {
  asProps?: {};
  fromProps(props: any): {};
};

export type ComponentsStore = {
  [key: string]: ComponentStore;
};

export type Store = {
  components: ComponentsStore;
};

export default (storeName: string) =>
  inject(({ store }: { store: Store }, props) => {
    const componentStore = store.components[storeName];

    return {
      ...componentStore.asProps,
      ...(componentStore.fromProps && componentStore.fromProps(props))
    };
  });
