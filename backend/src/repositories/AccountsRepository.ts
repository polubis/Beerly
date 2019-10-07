import { EntityRepository, Repository } from 'typeorm';
import { getConnection } from 'typeorm';

import { Account } from '../entities/Account';
import { User } from '../entities/User';

interface IAccountsRepository {
  findById: (id: number) => Promise<Account>;
  findByEmail: (email: string) => Promise<Account>;
  findByEmailOrUsername: (email: string, username: string) => Promise<Account>;
  findByConfirmationLink: (confirmationLink: string) => Promise<Account>;
  createAndSave: (account: Account) => Promise<boolean>;
  removeAccount: (id: number) => void;
}

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> implements IAccountsRepository {
  public findById = async (id: number) => await this.findOne({ id });

  public findByEmail = async (email: string) => await this.findOne({ email });

  public findByEmailOrUsername = async (email: string, username: string) =>
    await this.findOne({ where: [{ username }, { email }] });

  public findByConfirmationLink = async (confirmationLink: string) =>
    await this.findOne({ confirmationLink });

  public createAndSave = async (account: Account) => !!(await this.save(account));

  public removeAccount = async (id: number) => {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Account)
      .where('id = :id', { id })
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  };
}
