import bcrypt from 'bcrypt';
import { CreateAccountBody, Account } from './user.types';
import {UserResource} from './user.resource';

const SALT_ROUNDS = 10;

interface UserService {
  create(params: CreateAccountBody): Promise<Readonly<Account>>;
  // login(credentials: any): Promise<any>;
  // updateProfile(profileData: any): Promise<any>;
  // getProfile(id: string): Promise<any>;
}
class UserServiceImplementation implements UserService {

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
  }

  public async create(params: CreateAccountBody): Promise<Readonly<Account>> {
    const encryptedPassword = this.encryptPassword(params.password);
    const createdUser = await UserResource.create({ ...params, password: encryptedPassword });
    const { password, ...restUserFields } = createdUser;
    return restUserFields;
  }
}

export const UserService: UserService = new UserServiceImplementation();
