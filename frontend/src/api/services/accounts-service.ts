import { Service } from '.';
import { AccountCreationPayload } from '../models/payloads/account-creation-payload';

class AccountsService extends Service {
  private readonly path = 'accounts';

  create(accountCreationPayload: AccountCreationPayload) {
    return this.postRawJSON<AccountCreationPayload, null>(this.path, accountCreationPayload);
  }
}

export default new AccountsService();
