import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { Account } from '../entities/Account';
import { BadRequest, Forbidden } from '../utils/exceptions';
import { CreateAccountFormData } from '../dtos/incoming/CreateAccountFormData';
import { getAccountCreationConfig } from '../emails/account-creation-config';
import { User } from '../entities/User';

import { AccountsRepository } from '../repositories/AccountsRepository';

import emailService from './EmailService';

interface IAccountsService {
  createAccount: (formData: CreateAccountFormData) => Promise<undefined>;
  getAccount: (email: string) => Promise<Account>;
  checkPassword: (typedPassword: string, foundUserPassword: string) => Promise<boolean>;
  deleteAccount: (accountId: number) => Promise<void>;
}

class AccountsService implements IAccountsService {
  public createAccount = async (data: CreateAccountFormData) => {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const foundAccount = await accountsRepository.findByEmail(data.email);

    if (foundAccount) {
      throw new BadRequest('Account with given data already exists');
    }

    const accountCreationDate = new Date();
    const confirmationLink = await hash(accountCreationDate.toDateString(), 10);

    const password = await hash(data.password, 10);
    const newAccount: Account = {
      ...new Account(),
      email: data.email,
      password,
      confirmationLink,
      user: {
        ...new User(),
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        modificationDate: accountCreationDate
      }
    };

    await accountsRepository.createAndSave(newAccount);

    await emailService.sendMail(
      data.email,
      getAccountCreationConfig(
        data.username,
        `${process.env.REDIRECTION_URL_DEV}/register?confirmation=${confirmationLink}`
      )
    );

    return Promise.resolve(undefined);
  };

  public getAccount = async (email: string) => {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const foundAccount = await accountsRepository.findByEmail(email);

    return Promise.resolve(foundAccount);
  };

  public checkPassword = async (typedPassword: string, foundUserPassword: string) =>
    compare(typedPassword, foundUserPassword);

  public deleteAccount = async (accountId: number) => {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const foundAccount = await accountsRepository.findById(accountId);

    if (!foundAccount) {
      throw new BadRequest('No account with given id');
    }

    if (foundAccount.id !== accountId) {
      throw new Forbidden('No permissions');
    }

    await accountsRepository.removeAccount(foundAccount.id);

    return Promise.resolve();
  };
}

export default new AccountsService();
