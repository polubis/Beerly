import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import moment from 'moment';

import { Account } from '../entities/Account';
import { ALLOWED_ACCOUNT_ACTIVATION_DAYS_LIMIT } from '../utils/constants';
import { PendingAccount } from '../entities/PendingAccount';
import { User } from '../entities/User';
import { BadRequest, Forbidden } from '../utils/exceptions';
import { CreateAccountFormData } from '../dtos/incoming/CreateAccountFormData';
import { getAccountCreationConfig } from '../emails/account-creation-config';

import { AccountsRepository } from '../repositories/AccountsRepository';
import { PendingAccountsRepository } from '../repositories/PendingAccountsRepository';

import emailService from './EmailService';

interface IAccountsService {
  createAccount: (formData: CreateAccountFormData) => Promise<void>;
  getAccount: (email: string) => Promise<Account>;
  checkPassword: (typedPassword: string, foundUserPassword: string) => Promise<boolean>;
  deleteAccount: (accountId: number) => Promise<void>;
}

class AccountsService implements IAccountsService {
  public createAccount = async (data: CreateAccountFormData) => {
    const pendingAccountsRepository = getCustomRepository(PendingAccountsRepository);
    const foundPendingAccount = await pendingAccountsRepository.findByEmailOrUsername(
      data.email,
      data.username
    );

    if (foundPendingAccount) {
      throw new BadRequest('Account with given data already exists');
    }

    const accountsRepository = getCustomRepository(AccountsRepository);
    const foundAccount = await accountsRepository.findByEmailOrUsername(data.email, data.username);

    if (foundAccount) {
      throw new BadRequest('Account with given data already exists');
    }

    const pendingAccountCreationDate = new Date();
    const confirmationLink = await hash(pendingAccountCreationDate.toDateString(), 10);

    const password = await hash(data.password, 10);
    const newPendingAccount: PendingAccount = {
      ...new PendingAccount(),
      email: data.email,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      password,
      confirmationLink,
      creationDate: pendingAccountCreationDate
    };

    await pendingAccountsRepository.createAndSave(newPendingAccount);

    await emailService.sendMail(
      data.email,
      getAccountCreationConfig(
        data.username,
        `${process.env.REDIRECTION_URL_DEV}/register-confirmation/${confirmationLink}`
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

    await accountsRepository.removeById(foundAccount.id);

    return Promise.resolve();
  };

  public confirmAccount = async (confirmationLink: string) => {
    const pendingAccountsRepository = getCustomRepository(PendingAccountsRepository);
    const pendingAccount = await pendingAccountsRepository.findByConfirmationLink(confirmationLink);

    if (!pendingAccount) {
      throw new BadRequest('Invalid confirmation link');
    }

    const isUnableToActive =
      moment(pendingAccount.creationDate).diff(moment(), 'days') >
      ALLOWED_ACCOUNT_ACTIVATION_DAYS_LIMIT;

    if (isUnableToActive) {
      await pendingAccountsRepository.removeById(pendingAccount.id);
      throw new BadRequest('Account activation limit is 7 days. Create your account again');
    }

    const accountsRepository = getCustomRepository(AccountsRepository);

    const newAccount: Account = {
      ...new Account(),
      email: pendingAccount.email,
      username: pendingAccount.username,
      password: pendingAccount.password,
      user: {
        ...new User(),
        dateOfBirth: pendingAccount.dateOfBirth,
        modificationDate: new Date()
      }
    };

    await accountsRepository.createAndSave(newAccount);
    await pendingAccountsRepository.removeById(pendingAccount.id);

    return Promise.resolve();
  };
}

export default new AccountsService();
