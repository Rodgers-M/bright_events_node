import { GraphQLID, GraphQLString } from 'graphql';
import { UserType, RawAccount, AccountLookupKey, CreatedUserType, AccountBody, LoginUserType } from './user.types';
import { UserService } from './user.service';
import { Request } from 'express';

export const userQueryFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: RawAccount, args: { id: string }, context: { request: Request }) {
      const reqUser = context.request.user as any;
      const user: RawAccount  =  await UserService.getUser(AccountLookupKey.ID, args.id);
      return user;
    }
  }
};

export const userMutationFields = {
  createUser: {
    type: CreatedUserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent: RawAccount, args: AccountBody) {
      const createdUser = await UserService.create({
        email: args.email,
        password: args.password,
      });
      return createdUser;
    }
  },
  loginUser: {
    type: LoginUserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent: RawAccount, args: AccountBody) {
      const response = await UserService.login(args);
      return response;
    }
  }
};
