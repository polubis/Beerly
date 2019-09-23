import { beers } from 'src/__mocks__/beers';
import { Beer } from 'src/models/beer';
import { Service } from '.';

class BeersService extends Service {
  getRecommended = () =>
    this.simulate<Beer[]>(beers.map(beer => ({ ...beer, header: 'Beers of the year' })));

  get = () => this.simulate<Beer[]>(beers);

  add = (beer: Partial<Beer>) =>
    this.simulate<Beer>({ ...beer, id: 1001, picture: beers[0].picture });

  edit = (beer: Partial<Beer>) =>
    this.simulate<Beer>({ ...beer, id: 1001, picture: beers[0].picture });

  delete = (beerId: number) => this.simulate<Beer>({ status: 200, data: null });
}

export default new BeersService();
