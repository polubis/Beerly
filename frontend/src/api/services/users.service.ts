import { Service } from '.';
import { UserWithFavouriteBeers } from 'models/user';
import { usersWithFavouriteBeers } from 'src/__mocks__/users';

class UsersService extends Service {
  constructor() {
    super('users');
  }
  getUsersWithFavouriteBeers = () =>
    this.simulate<UserWithFavouriteBeers[]>(usersWithFavouriteBeers);
}

export default new UsersService();
