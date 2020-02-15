import { EventsService } from './events.service';
import { EventLookUpKey, CreateEventBody } from './events.types';
import {UserService} from '../users/user.service';
import {AccountLookupKey} from '../users/user.types';

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

  extend type Query {
    event(id: String): Event
  }

  input EventInput {
    title: String
    slug: String
    description: String
    location: String
    date: String
    time: String
    rsvpEndDate: String
    createdBy: String
  }

  extend type Mutation {
    createEvent(createEventInput: EventInput): Event
  }
`;

export const eventResolvers = {
  Query: {
    async event(_: any, { id }: { id: string }) {
      const event = await EventsService.getEvent(EventLookUpKey.ID, id);
      return event;
    }
  },

  Mutation: {
    async createEvent(_: any, { createEventInput }: { createEventInput: CreateEventBody }) {
      const createdEvent = await EventsService.create(createEventInput);
      return createdEvent;
    }
  },
  Event: {
    async author(event: { createdBy: string }) {
      const author = await UserService.getUser(AccountLookupKey.ID, event.createdBy);
      return author;
    }
  }
};
