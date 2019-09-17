import React, { createContext } from 'react';
import { ComponentType } from 'react';

export type ProviderActions<T> = {
  swap: (payload: any, key: keyof T) => void;
};

export type ProviderState<T> = ProviderActions<T> & T;

export type ProviderSnapshot<T> = {
  initState: ProviderState<T>;
  Context: React.Context<ProviderState<T>>;
};

export const createProviderSnapshot = <T extends object>(entity: T): ProviderSnapshot<T> => {
  const actions: ProviderActions<T> = {
    swap: () => {}
  };

  const initState = {
    ...entity,
    ...actions
  };

  return {
    initState,
    Context: createContext<ProviderState<T>>(initState)
  };
};

export const makeProvider = <T extends object, P extends object = any>(
  initState: ProviderState<T>,
  ContextProvider: React.ProviderExoticComponent<React.ProviderProps<ProviderState<T>>>
) => (Component: ComponentType<P>): React.ComponentClass<P, ProviderState<T>> => {
  return class Provider extends React.Component<P, ProviderState<T>> implements ProviderActions<T> {
    swap = (payload: any, key: keyof T) => {
      this.setState({ [key]: payload } as any);
    };

    readonly state: ProviderState<T> = {
      ...initState,
      swap: this.swap
    };

    render = () => (
      <ContextProvider value={this.state}>
        <Component {...(this.props as P)} />
      </ContextProvider>
    );
  };
};
