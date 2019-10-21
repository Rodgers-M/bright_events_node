export interface UserRequestInterface {
  firstName: string;
  lastName: string;
  email: string;
}
export interface UserServiceInterface {
 signup(userRequest: UserRequestInterface): Promise<string>;
}
