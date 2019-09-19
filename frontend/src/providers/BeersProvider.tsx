import { Beer } from 'models/beer';
import { createProviderSnapshot, makeProvider } from './Provider';

export class BeersProviderState {
  beers: Beer[] = [];
  beersLoading = true;
  beersError = '';
  beer: Beer | null = null;
  beerLoading = false;
  beerError = '';
}

const snapshot = createProviderSnapshot<BeersProviderState>(new BeersProviderState());

export const BeersContext = snapshot.Context;

export default makeProvider<BeersProviderState>(snapshot);
