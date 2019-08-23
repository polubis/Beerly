import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { NotFound } from '../utils/exceptions';

interface IUsersService {
  getUserById: (id: number) => Promise<{ id: number }>;
}

class UsersService implements IUsersService {
  public getUserById = async (id: number) => {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFound('User not found');
    }

    return Promise.resolve(user);
  };
}

export default new UsersService();
