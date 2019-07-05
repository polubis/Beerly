import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories/UserRepository';
import { NotFound } from '../utils/exceptions';

interface IUserService {
  getUserById: (id: number) => Promise<{ id: number }>;
}

class UserService implements IUserService {
  public getUserById = async (id: number) => {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFound('User not found');
    }

    return Promise.resolve(user);
  };
}

export default new UserService();
