import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = (initialState?: any) => {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  console.log(reducers);
  // create store
  return createStore(combineReducers(reducers as any), initialState, enhancers);
};

export default configureStore();
