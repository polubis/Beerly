import beersActionTypes from '../action-types/beersActionTypes';

const initialState: any = {
  page: 1,
  beers: [],
  beersLoading: true,
  beersError: ''
};

export const beersReducer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case beersActionTypes.BEERS_LOAD:
      return { ...state, beersLoading: true, beersError: '' };

    case beersActionTypes.BEERS_LOAD_SUCCESS:
      return {
        ...state,
        beers: [...state.beers, ...action.beers].map((b, idx) => ({ ...b, id: idx })),
        beersLoading: false,
        beersError: ''
      };

    case beersActionTypes.BEERS_LOAD_FAILURE:
      return { ...state, beers: [], beersLoading: false, beersError: action.error };

    default:
      return state;
  }
};
