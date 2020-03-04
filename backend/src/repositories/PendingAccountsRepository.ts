import { EntityRepository, Repository, getConnection } from 'typeorm';

import { PendingAccount } from '../entities/PendingAccount';

@EntityRepository(PendingAccount)
export class PendingAccountsRepository extends Repository<PendingAccount> {
  public findById = async (id: number) => await this.findOne({ id });

  public findByEmail = async (email: string) => await this.findOne({ email });

  public findByEmailOrUsername = async (email: string, username: string) =>
    await this.findOne({ where: [{ username }, { email }] });

  public findByConfirmationLink = async (confirmationLink: string) =>
    await this.findOne({ confirmationLink });

  public createAndSave = async (pendingAccount: PendingAccount) =>
    !!(await this.save(pendingAccount));

  public removeById = async (id: number) => {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PendingAccount)
      .where('id = :id', { id })
      .execute();
  };
}
