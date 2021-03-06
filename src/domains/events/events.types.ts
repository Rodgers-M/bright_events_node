import * as knex from 'knex';

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
  id: string;
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
  offset?: number;
  limit?: number;
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
