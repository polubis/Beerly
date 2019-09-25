import { all } from 'redux-saga/effects';
import { loadBeersWatcher } from './beersSagas';

export function* rootSaga() {
  yield all([loadBeersWatcher()]);
}
