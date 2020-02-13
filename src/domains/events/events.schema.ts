import { GraphQLString } from 'graphql';
import { CreateEventType } from './events.types';
import { EventsService } from './events.service';

export const eventsMutationFields = {
  createEvent: {
    type: CreateEventType,
    args: {
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      location: { type: GraphQLString },
      date: { type: GraphQLString },
      time: { type: GraphQLString },
      rsvpEndDate: { type: GraphQLString },
      createdBy: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
      const event = await EventsService.create(args);
      return event;
    }
  }
};
