import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

// graphql types
export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

export const CreatedUserType = new GraphQLObjectType({
  name: 'CreatedUser',
  fields: () => ({
    token: { type: GraphQLString },
  })
});

export const LoginUserType = new GraphQLObjectType({
  name: 'LoginUser',
  fields: () => ({
    token: { type: GraphQLString },
    message: { type: GraphQLString }
  })
});

// interfaces
export interface AccountBody {
  email: string;
  password: string;
}

export interface Account {
  id: string;
  email: string;
}

export interface RawAccount {
  id: string;
  email: string;
  password: string;
}

export interface AccountResponse {
  message: string;
  token: string;
}

export enum AccountLookupKey {
  ID = 'id',
  EMAIL = 'email'
}
