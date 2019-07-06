import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../repositories/UserRepository';
import { NotFound } from '../utils/exceptions';

interface IAccountService {
  createAccount: (id: number) => Promise<{ id: number }>;
}

class AccountService implements IAccountService {

  createAccount = async () => {
    // Zaimplementowac rejestracje
    return Promise.resolve(undefined);
  };
}

export default new AccountService();
