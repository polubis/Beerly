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
  createAccount: (formData: CreateAccountFormData) => Promise<void>;
  getAccount: (email: string) => Promise<Account>;
  checkPassword: (typedPassword: string, foundUserPassword: string) => Promise<boolean>;
  deleteAccount: (accountId: number) => Promise<void>;
}

class AccountsService implements IAccountsService {
  public createAccount = async (data: CreateAccountFormData) => {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const foundAccount = await accountsRepository.findByEmailOrUsername(data.email, data.username);

    if (foundAccount) {
      throw new BadRequest('Account with given data already exists');
    }

    const accountCreationDate = new Date();
    const confirmationLink = (await hash(accountCreationDate.toDateString(), 10));

    const password = await hash(data.password, 10);
    const newAccount: Account = {
      ...new Account(),
      email: data.email,
      username: data.username,
      password,
      confirmationLink,
      accountRequestDate: accountCreationDate,
      user: {
        ...new User(),
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

    return Promise.resolve();
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

  public confirmAccount = async (confirmationLink: string) => {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const account = await accountsRepository.findByConfirmationLink(confirmationLink.trim());

    if (!account) {
      throw new BadRequest('Invalid confirmation link');
    }

    // await accountsRepository.setAccountAsActive();

    console.log(confirmationLink);

    return Promise.resolve();
  };
}

export default new AccountsService();
