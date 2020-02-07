import { GraphQLID, GraphQLString } from 'graphql';
import { UserType, RawAccount, AccountLookupKey, CreatedUserType, AccountBody } from './user.types';
import { UserService } from './user.service';

export const userQueryFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: RawAccount, args: { id: string }) {
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
  }
};
