import { beers } from 'src/__mocks__/beers';
import { Beer } from 'src/models/beer';
import { Service } from '.';

class BeersService extends Service {
  getRecommended = () =>
    this.simulate<Beer[]>(beers.map(beer => ({ ...beer, header: 'Beers of the year' })));

  getBeers = () => this.simulate<Beer[]>(beers);
}

export default new BeersService();
