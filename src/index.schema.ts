import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { userTypeDefs, userResolvers } from './domains/users/user.schema';
import { eventTypeDefs, eventResolvers } from './domains/events/events.schema';

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [ rootTypeDefs, userTypeDefs, eventTypeDefs ],
  resolvers: merge(userResolvers, eventResolvers)
});
