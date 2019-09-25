import beersActionsTypes from '../action-types/beersActionTypes';

const _beers = {
  [beersActionsTypes.BEERS_LOAD]: () => ({
    type: beersActionsTypes.BEERS_LOAD
  }),
  [beersActionsTypes.BEERS_LOAD_SUCCESS]: beers => ({
    type: beersActionsTypes.BEERS_LOAD_SUCCESS,
    beers
  }),
  [beersActionsTypes.BEERS_LOAD_FAILURE]: error => ({
    type: beersActionsTypes.BEERS_LOAD_FAILURE,
    error
  })
};

const _beer = {
  // Dodaj sobie akcje do zmiany pojedynczego piwa
};

export default Object.freeze({
  ..._beers,
  ..._beer
}) as any;
