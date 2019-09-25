import { makeReducer } from '../utils/makeReducer';

export const beersReducer = makeReducer([
  {
    key: 'beers',
    value: [],
    updateCallback: (state, action) => [...state.beers, ...action.beers]
  },
  {
    key: 'beer',
    value: null
  }
]);

// *** OLD REDUCER SYNTAX

/* 
const initialState: any = {
  page: 1,
  beers: [],
  beersLoading: true,
  beersError: ''
};

const _beersMap: any = {
  [beersActionTypes.BEERS_LOAD]: () => ({
    beersLoading: true,
    beersError: ''
  }),
  [beersActionTypes.BEERS_LOAD_SUCCESS]: (state, { beers }) => ({
    beers: [...beers, ...state.beers],
    beersLoading: false,
    beersError: ''
  }),
  [beersActionTypes.BEERS_LOAD_FAILURE]: (_, { error }) => ({
    beersLoading: false,
    beersError: error
  })
};

const _beerMap: any = {};

const beersReducerMap: any = {
  ..._beersMap,
  ..._beerMap
};

export const beersReducer = (state: any = initialState, action: any) =>
  beersReducerMap.hasOwnProperty(action.type)
    ? { ...state, ...beersReducerMap[action.type](state, action) }
    : state;

*/

// *** OLD REDUCER SYNTAX

// export const beersReducer = (state: any = initialState, action: any): any => {
//   switch (action.type) {
//     case beersActionTypes.BEERS_LOAD:
//       return { ...state, beersLoading: true, beersError: '' };

//     case beersActionTypes.BEERS_LOAD_SUCCESS:
//       return {
//         ...state,
//         beers: [...state.beers, ...action.beers].map((b, idx) => ({ ...b, id: idx })),
//         beersLoading: false,
//         beersError: ''
//       };

//     case beersActionTypes.BEERS_LOAD_FAILURE:
//       return { ...state, beers: [], beersLoading: false, beersError: action.error };

//     default:
//       return state;
//   }
// };
