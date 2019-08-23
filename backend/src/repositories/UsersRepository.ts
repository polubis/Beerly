import { EntityRepository, Repository } from 'typeorm';
import { getConnection } from 'typeorm';

import { User } from '../entities/User';

interface IUsersRepository {
  findById: (id: number) => Promise<User>;
  findByEmailOrUsername: (email: string, username: string) => Promise<User>;
  createAndSave: (user: User) => Promise<boolean>;
}

@EntityRepository(User)
export class UsersRepository extends Repository<User> implements IUsersRepository {
  public findById = async (id: number) => await this.findOne({ id });

  public findByEmailOrUsername = async (email: string, username: string) =>
    await this.findOne({ where: [{ username }, { email }] });

  public createAndSave = async (user: User) => !!(await this.save(user));
}
