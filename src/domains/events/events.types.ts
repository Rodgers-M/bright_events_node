import * as knex from 'knex';
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { UserType, AccountLookupKey } from '../users/user.types';
import { UserResource } from '../users/user.resource';

// graphql types
export const CreateEventType = new GraphQLObjectType({
  name: 'CreateEvent',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    rsvpEndDate: { type: GraphQLString },
    createdBy: {
      type: UserType,
      async resolve(parent: any, args: any) {
        const eventAuthor = UserResource.getUser(AccountLookupKey.ID, parent.createdBy);
        return eventAuthor;
      }
    },
  })
});

// interfaces
export interface CreateEventBody {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  rsvpEndDate: string;
  createdBy: string;
}

export interface EventBody {
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  time: string;
  rsvpEndDate: string;
  createdBy: string;
}

export interface RawEventBody extends EventBody {
  id: string;
}

export enum EventLookUpKey {
  ID = 'id',
  SLUG = 'slug',
}

export interface UpdateEventBody {
  title?: string;
  slug?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  rsvpEndDate?: string;
  createdBy?: string;
}

export interface EventsFilter {
  q?: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  rsvpEndDate?: string;
  createdBy?: string;

  dateGreaterThan?: string;
  dateLessThan?: string;
  dateGreaterThanEqualTo?: string;
  dateLessThanEqualTo?: string;

  rsvpEndDateGreaterThan?: string;
  rsvpEndDateGreaterThanEqualTo?: string;
  rsvpEndDateLessThan?: string;
  rsvpEndDateLessThanEqualTo?: string;
}

export enum EventsFilterFields {
  TITLE = 'title',
  LOCATION = 'location',
}

export type QueryBuilderFunction = (query: knex.QueryBuilder) => knex.QueryBuilder;
