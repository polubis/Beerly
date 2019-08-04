import { User, UserWithFavouriteBeers } from 'models/user';

import { beers } from './beers';

export const users: User[] = [
  {
    id: 1,
    firstName: 'Jessica',
    lastName: 'Perk',
    username: 'jperkao12',
    gender: 'Female',
    picture: '../../public/images/user.png'
  },
  {
    id: 2,
    firstName: 'Jessica',
    lastName: 'Perk',
    username: 'jperkao12',
    gender: 'Female',
    picture: '../../public/images/user.png'
  },
  {
    id: 3,
    firstName: 'Jessica',
    lastName: 'Perk',
    username: 'jperkao12',
    gender: 'Female',
    picture: '../../public/images/user.png'
  },
  {
    id: 4,
    firstName: 'Jessica',
    lastName: 'Perk',
    username: 'jperkao12',
    gender: 'Female',
    picture: '../../public/images/user.png'
  },
  {
    id: 5,
    firstName: 'Jessica',
    lastName: 'Perk',
    username: 'jperkao12',
    gender: 'Female',
    picture: '../../public/images/user.png'
  }
];

export const usersWithFavouriteBeers: UserWithFavouriteBeers[] = users.slice(0, 5).map(user => ({
  ...user,
  favouriteBeers: [...beers].slice(0, 3)
}));
