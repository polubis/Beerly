import beersActions from '../actions/beersActions';
import beersService from 'services/beers-service';

export const loadBeers = () => dispatch => {
  dispatch(beersActions.BEERS_LOAD());

  beersService
    .get()
    .toPromise()
    .then(beers => {
      dispatch(beersActions.BEERS_LOAD_SUCCESS(beers));
    })
    .catch(err => {
      dispatch(beersActions.BEERS_LOAD_FAILURE(err));
    });
};

// We can create function which takes entites - returns actions, async actions and reducers with initial state
