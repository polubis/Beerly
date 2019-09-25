import { put, takeEvery } from 'redux-saga/effects';
import beersService from '../../api/services/beers-service';
import beersActions from '../actions/beersActions';
import beersActionTypes from '../action-types/beersActionTypes';

export function* loadBeers() {
  try {
    const beers = yield beersService.get().toPromise();
    yield put(beersActions.BEERS_LOAD_SUCCESS(beers));
  } catch (e) {
    yield put(beersActions.BEERS_LOAD_FAILURE(e));
  }
}

export function* loadBeersWatcher() {
  yield takeEvery(beersActionTypes.BEERS_LOAD, loadBeers);
}
