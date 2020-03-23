import { AccountLookupKey, AccountBody } from './user.types';
import { UserService } from './user.service';

export const userTypeDefs = `
  type User {
    id: ID
    email: String
  }

  type UserAccountResponse {
    message: String
    token: String
  }

  input AccountInput {
    email: String!
    password: String!
  }

  extend type Query {
    user(id: String): User
  }

  extend type Mutation {
    createUserAccount(createAccountInput: AccountInput!): UserAccountResponse
    loginUser(loginUserInput: AccountInput!): UserAccountResponse
  }
`;

export const userResolvers = {
  Query: {
    async user(_: any, { id }: { id: string }) {
      const user = await UserService.getUser(AccountLookupKey.ID, id);
      return user;
    },
  },
  Mutation: {
    async createUserAccount(_: any, { createAccountInput }: { createAccountInput: AccountBody } ) {
      const createdAccount = await UserService.create(createAccountInput);
      return createdAccount;
    },
    async loginUser(_: any, { loginUserInput }: { loginUserInput: AccountBody }) {
      console.log('initialize login');
      const response = await UserService.login(loginUserInput);
      return response;
    }
  }
};
