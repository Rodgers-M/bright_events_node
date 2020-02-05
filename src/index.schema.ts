import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } from 'graphql';
import { userSchemaFields } from './domains/users/user.schema';

const books = [
  { name: 'book1', genre: 'genre 1', id: 1},
  { name: 'book2', genre: 'genre 2', id: 2},
  { name: 'book2', genre: 'genre 2', id: 3},
];

const authors = [
  { name: 'author1', age: 'age 1', id: 1},
  { name: 'author2', age: 'age 2', id: 2},
  { name: 'author2', age: 'age 2', id: 3},
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    Age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userSchemaFields,
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data // data source
        const book = books[args.id -1];
        return book;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors[args.id -1];
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
