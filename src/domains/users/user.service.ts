import bcrypt from 'bcrypt';
import { AccountBody, AccountLookupKey, AccountResponse, RawAccount } from './user.types';
import { UserResource } from './user.resource';
import { BrightEventsError } from '../../lib/util/brightEvents.error';
import { createToken } from '../../lib/helpers/jwtHelper';
import { getConfig } from '../../config/config';
import { sendSms } from '../../lib/messaging/sms';

const SALT_ROUNDS = 10;

interface UserService {
  create(params: AccountBody): Promise<Readonly<AccountResponse>>;
  login(credentials: AccountBody): Promise<AccountResponse>;
  getUser(lookupKey: AccountLookupKey, value: string ): Promise<Readonly<RawAccount>>;
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

  public async getUser(lookupKey: AccountLookupKey, value: string): Promise<Readonly<RawAccount>> {
    const account: RawAccount = await UserResource.getUser(lookupKey, value);
    return account;
  }

  public async create(params: AccountBody): Promise<Readonly<AccountResponse>> {
    const { email, password } = params;
    const existingAccount = await UserResource.getUser(AccountLookupKey.EMAIL, email);
    if (existingAccount) {
      throw new BrightEventsError(`email ${ email } already exists`, 409);
    }
    const encryptedPassword = this.encryptPassword(password);
    const createdUser = await UserResource.create({ ...params, password: encryptedPassword });
    const { secretKey } = getConfig().jwt;
    const token = createToken({ id: createdUser.id }, secretKey);
    await sendSms({to: '+254704652948', message: 'thanks for login'});
    return { message: 'account created successfuly', token };
  }

  public async login(accountCredentials: AccountBody): Promise<AccountResponse> {
    console.log('login function called');
    const { email, password } = accountCredentials;
    const user = await UserResource.getUser(AccountLookupKey.EMAIL, email);
    if(!user) {
      throw new BrightEventsError('wrong email or password', 401);
    }

    const isPasswordValid = await this.comparePasswordHash(password, user.password);
    if(!isPasswordValid) {
      throw new BrightEventsError('wrong email or password', 401);
    }

    const { secretKey } = getConfig().jwt;
    const token = createToken({ id: user.id }, secretKey);
    console.log('sending sms');
    await sendSms({to: '+254704652948', from: 'GRIFFIN',  message: 'thanks for login'});
    return { message: 'login successfuly', token };

  }
}

export const UserService: UserService = new UserServiceImplementation();
