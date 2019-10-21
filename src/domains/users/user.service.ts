import { UserRequestInterface, UserServiceInterface } from './user.types';

export class UserService implements UserServiceInterface {

  public async signup( userRequest: UserRequestInterface): Promise<string> {
    console.log(userRequest);
    const name = 'myname';
    return name;
  }
}
