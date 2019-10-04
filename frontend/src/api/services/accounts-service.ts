import { Service } from '.';
import { AccountCreationPayload } from '../models/payloads/account-creation-payload';

class AccountsService extends Service {
  constructor() {
    super('accounts');
  }

  create = (accountCreationPayload: AccountCreationPayload) =>
    this.postRawJSON<AccountCreationPayload, null>('', accountCreationPayload);
}

export default new AccountsService();
