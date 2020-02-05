import { GraphQLID } from 'graphql';
import { UserType, RawAccount, AccountLookupKey } from './user.types';
import { UserService } from './user.service';

export const userSchemaFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: any, args: any) {
      const user: RawAccount  =  await UserService.getUser(AccountLookupKey.ID, args.id);
      return user;
    }
  }
};
