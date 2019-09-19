import React, { createContext } from 'react';
import { ComponentType } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export type ProviderActions<T> = {
  swap: (payload: any, key: keyof T) => void;
  merge: (payload: any, key: keyof T, direction?: 'front' | 'back') => void;
  optimize: (...args: any[]) => void;
};

export type ProviderState<T> = ProviderActions<T> & T;

export type ProviderSnapshot<T> = {
  initState: ProviderState<T>;
  Context: React.Context<ProviderState<T>>;
};

export const createProviderSnapshot = <T extends Object>(entity: T): ProviderSnapshot<T> => {
  const actions: ProviderActions<T> = {
    swap: () => {},
    merge: () => {},
    optimize: () => {}
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

export const makeProvider = <T extends Object, P extends Object = any>(
  { initState, Context }: ProviderSnapshot<T>
) => (Component: ComponentType<P>): React.ComponentClass<P, ProviderState<T>> => {
  return class Provider extends React.Component<P, ProviderState<T>> implements ProviderActions<T> {
    swap = (payload: any, key: keyof T) => {
      this.setState({ [key]: payload } as any);
    };

    merge = (payload: any, key: keyof T, direction: 'front' | 'back' = 'back') => {
      if (Array.isArray(payload) && Array.isArray(this.state[key])) {
        const nextState: any =
          direction === 'back'
            ? [...(this.state[key] as any), ...payload]
            : [...payload, ...(this.state[key] as any)];

        this.setState({ [key]: nextState } as any);
      } else {
        const nextState: any =
          direction === 'back'
            ? { ...this.state[key], ...payload }
            : { ...payload, ...this.state[key] };
        this.setState({ [key]: nextState } as any);
      }
    };

    optimize = (...args: any[]) => {
      unstable_batchedUpdates(() => {
        args.forEach(arg => {
          arg();
        });
      });
    };

    readonly state: ProviderState<T> = {
      ...initState,
      swap: this.swap,
      merge: this.merge,
      optimize: this.optimize
    };

    render = () => (
      <Context.Provider value={this.state as ProviderState<T>}>
        <Component {...(this.props as P)} />
      </Context.Provider>
    );
  };
};
