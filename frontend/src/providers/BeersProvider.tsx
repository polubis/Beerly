import { Beer } from 'models/beer';
import { createProviderSnapshot, makeProvider } from './Provider';
import { beers } from 'src/__mocks__/beers';

export type BeersProviderState = {
  beers: Beer[];
  beer: Beer | null;
};

const { initState, Context } = createProviderSnapshot<BeersProviderState>({
  beer: beers[0],
  beers: beers
});

export const BeersContext = Context;

export default makeProvider<BeersProviderState>(initState, BeersContext.Provider);
