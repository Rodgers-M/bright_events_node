import { GraphQLID, GraphQLString } from 'graphql';
import { UserType, RawAccount, AccountLookupKey, CreatedUserType } from './user.types';
import { UserService } from './user.service';

export const userQueryFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: any, args: any) {
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
    async resolve(parent: any, args: any) {
      const createdUser = await UserService.create({
        email: args.email,
        password: args.password,
      });
      return createdUser;
    }
  }
};
