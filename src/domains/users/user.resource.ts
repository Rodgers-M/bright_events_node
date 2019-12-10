import { AccountBody, RawAccount, AccountLookupKey } from './user.types';
import { knexInstance } from '../../database/knexInstance';

const ACCOUNTS_TABLE = 'accounts';

interface UserResource {
  create(params: AccountBody): Promise<Readonly<RawAccount>>;
  getUser(lookupKey: AccountLookupKey, lookup: string): Promise<Readonly<RawAccount>>;
  // updateProfile(profileData: any): Promise<any>;
  // getProfile(id: string): Promise<any>;
}

class UserResourceSingleton implements UserResource {
  public async create(params: AccountBody): Promise<Readonly<RawAccount>> {
    const created: RawAccount[] = await knexInstance<RawAccount>(ACCOUNTS_TABLE)
      .insert(params, '*');

    return created[0];
  }

  public async getUser(lookupKey: AccountLookupKey, value: string): Promise<Readonly<RawAccount>> {
    const account = knexInstance<RawAccount>(ACCOUNTS_TABLE)
    .select('*')
    .where(lookupKey, value)
    .first();

    return account;
  }
}

export const UserResource: UserResource = new UserResourceSingleton();
