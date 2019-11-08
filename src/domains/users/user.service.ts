import bcrypt from 'bcrypt';
import { AccountBody, AccountLookupKey, CreateAccountResponse } from './user.types';
import { UserResource } from './user.resource';
import { BrightEventsError } from '../../lib/util/brightEvents.error';
import { createToken } from '../../lib/helpers/jwtHelper';

const SALT_ROUNDS = 10;

interface UserService {
  create(params: AccountBody): Promise<Readonly<CreateAccountResponse>>;
  // login(credentials: any): Promise<any>;
  // updateProfile(profileData: any): Promise<any>;
  // getProfile(id: string): Promise<any>;
}
class UserServiceImplementation implements UserService {

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
  }

  public async create(params: AccountBody): Promise<Readonly<CreateAccountResponse>> {
    const { email, password } = params;
    const existingAccount = await UserResource.getUser(AccountLookupKey.EMAIL, email);
    if (existingAccount) {
      throw new BrightEventsError(`email ${ email } already exists`, 409);
    }
    const encryptedPassword = this.encryptPassword(password);
    const createdUser = await UserResource.create({ ...params, password: encryptedPassword });
    const token = createToken({ id: createdUser.id }, 'secretKey', { expiresIn: '5h' } );
    return { message: 'account created successfuly', token };
  }
}

export const UserService: UserService = new UserServiceImplementation();
