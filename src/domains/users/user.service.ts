import bcrypt from 'bcrypt';
import { AccountBody, AccountLookupKey, AccountResponse } from './user.types';
import { UserResource } from './user.resource';
import { BrightEventsError } from '../../lib/util/brightEvents.error';
import { createToken } from '../../lib/helpers/jwtHelper';

const SALT_ROUNDS = 10;

interface UserService {
  create(params: AccountBody): Promise<Readonly<AccountResponse>>;
  login(credentials: AccountBody): Promise<AccountResponse>;
  // updateProfile(profileData: any): Promise<any>;
  // getProfile(id: string): Promise<any>;
}
class UserServiceImplementation implements UserService {

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
  }

  private async comparePasswordHash(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  public async create(params: AccountBody): Promise<Readonly<AccountResponse>> {
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

  public async login(accountCredentials: AccountBody): Promise<AccountResponse> {
    const { email, password } = accountCredentials;
    const user = await UserResource.getUser(AccountLookupKey.EMAIL, email);
    if(!user) {
      throw new BrightEventsError('wrong email or password', 401);
    }

    const isPasswordValid = await this.comparePasswordHash(password, user.password);
    if(!isPasswordValid) {
      throw new BrightEventsError('wrong email or password', 401);
    }
    const token = createToken({ id: user.id }, 'secretKey', { expiresIn: '5h' } );
    return { message: 'login successfuly', token };

  }
}

export const UserService: UserService = new UserServiceImplementation();
