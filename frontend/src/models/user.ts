import { Beer } from './beer';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  picture?: string;
};

export type UserWithFavouriteBeers = User & { favouriteBeers: Beer[] };

