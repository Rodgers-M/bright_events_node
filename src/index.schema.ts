import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userSchemaFields } from './domains/users/user.schema';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userSchemaFields,
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
