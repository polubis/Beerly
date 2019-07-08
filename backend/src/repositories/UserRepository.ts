import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities/User';

interface IUserRepository {
  findById: (id: number) => Promise<User>;
  createAndSave: (username: string, email: string, password: string) => Promise<boolean>;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {
  public findById = async (id: number) => this.findOne({ id });

  public createAndSave = async (username: string, email: string, passwordHash: string) => {
    const user = new User();

    user.username = username;
    user.email = email;
    user.passwordHash = passwordHash;

    const result = await this.save(user);

    return !!result;
  };
}
