import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { userQueryFields, userMutationFields } from './domains/users/user.schema';
import { eventsMutationFields } from './domains/events/events.schema';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQueryFields,
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...eventsMutationFields,
    ...userMutationFields,
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
