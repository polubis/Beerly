import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import * as reducers from './reducers';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
