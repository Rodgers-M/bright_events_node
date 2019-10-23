import { CreateAccountBody, RawAccount } from './user.types';
import { knexInstance } from '../../database/knexInstance';

const ACCOUNTS_TABLE = 'accounts';

interface UserResource {
  create(params: CreateAccountBody): Promise<Readonly<RawAccount>>;
  // login(credentials: any): Promise<any>;
  // updateProfile(profileData: any): Promise<any>;
  // getProfile(id: string): Promise<any>;
}

class UserResourceSingleton implements UserResource {
  public async create(params: CreateAccountBody): Promise<Readonly<RawAccount>> {
    const created: RawAccount[] = await knexInstance<RawAccount>(ACCOUNTS_TABLE)
      .insert(params, '*');

    return created[0];
  }
}

export const UserResource: UserResource = new UserResourceSingleton();
