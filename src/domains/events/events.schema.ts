import { EventsService } from './events.service';
import { Request } from 'express';
import { EventLookUpKey, CreateEventBody, UpdateEventBody, EventsFilter } from './events.types';
import { UserService } from '../users/user.service';
import { AccountLookupKey } from '../users/user.types';

export const eventTypeDefs = `
  type Event {
    id: ID
    title: String
    slug: String
    description: String
    location: String
    date: String
    time: String
    rsvpEndDate: String
    createdBy: String
    author: User
  }

  input EventLookUp {
    id: String

  }


  input EventInput {
    title: String!
    description: String!
    location: String!
    date: String!
    time: String!
    rsvpEndDate: String!
  }

  input UpdateEventInput {
    id: ID!
    title: String
    description: String
    location: String
    date: String
    time: String
    rsvpEndDate: String
  }

  input EventsFilter {
    offset: Int
    limit: Int
  }

  extend type Query {
    event(id: String): Event
    allEvents(eventsFilter: EventsFilter) : [Event]
  }

  extend type Mutation {
    createEvent(createEventInput: EventInput): Event
    updatedEvent(createEventInput: UpdateEventInput): Event
  }
`;

export const eventResolvers = {
  Query: {
    async event(_: any, { id }: { id: string }) {
      const event = await EventsService.getEvent(EventLookUpKey.ID, id);
      return event;
    },
    async allEvents(
      _: any,
      { offset, limit , eventsFilter }: { offset: number, limit: number, eventsFilter: EventsFilter },
    ) {
      const allEvents = await EventsService.get(offset, limit, eventsFilter);
      return allEvents;
    }
  },

  Mutation: {
    async createEvent(
      _: any,
      { createEventInput }: { createEventInput: CreateEventBody },
      context: { request: Request },
    ) {
      const createdEvent = await EventsService.create(createEventInput, context.request);
      return createdEvent;
    },
    async updatedEvent(
      _: any,
      { updatedEventInput }: { updatedEventInput: UpdateEventBody },
      context: { request: Request },
    ) {
      const updatedEvent = await EventsService.updatedEvent(updatedEventInput, context.request);
      return updatedEvent;
    }
  },
  Event: {
    async author(event: { createdBy: string }) {
      const author = await UserService.getUser(AccountLookupKey.ID, event.createdBy);
      return author;
    }
  }
};
