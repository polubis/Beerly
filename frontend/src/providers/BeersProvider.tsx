import React, { Component } from 'react';
import { Beer } from 'models/beer';
import { createContext } from 'react';

type BeersProviderActions = {
  swap: <T extends object & null>(payload: T) => void;
  swapMany: <T extends any[]>(payload: T) => void;
};

const initialState: BeersProviderState = {
  beers: [],
  beer: null,
  swap: () => {},
  swapMany: () => {}
};

export type BeersProviderState = {
  beers: Beer[];
  beer: Beer | null;
} & BeersProviderActions;

export const BeersContext = createContext<BeersProviderState>(initialState);

export default class BeersProvider extends Component<any, BeersProviderState> {
  swap = <T extends object & null>(payload: T) => {
    this.setState({ beer: payload });
  };

  swapMany = <T extends any[]>(payload: T) => {
    this.setState({
      beers: payload
    });
  };

  readonly state: BeersProviderState = {
    ...initialState,
    swap: this.swap,
    swapMany: this.swapMany
  };

  render = () => (
    <BeersContext.Provider value={this.state}>{this.props.children}</BeersContext.Provider>
  );
}
