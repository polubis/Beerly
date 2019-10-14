import { EntityRepository, Repository } from 'typeorm';
import { getConnection } from 'typeorm';

import { Account } from '../entities/Account';
import { User } from '../entities/User';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
  public findById = async (id: number) => await this.findOne({ id });

  public findByEmail = async (email: string) => await this.findOne({ email });

  public findByEmailOrUsername = async (email: string, username: string) =>
    await this.findOne({ where: [{ username }, { email }] });

  public createAndSave = async (account: Account) => !!(await this.save(account));

  public removeById = async (id: number) => {
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
