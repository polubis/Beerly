import { Service } from '.';
import { AccountCreationPayload, AccountConfirmationPayload } from '../models/payloads';

class AccountsService extends Service {
  constructor() {
    super('accounts');
  }

  create = (accountCreationPayload: AccountCreationPayload) =>
    this.postRawJSON<AccountCreationPayload, null>('', accountCreationPayload);

  confirm = (accountConfirmationPayload: AccountConfirmationPayload) =>
    this.postRawJSON<AccountConfirmationPayload, null>('/confirm', accountConfirmationPayload);
}

export default new AccountsService();
