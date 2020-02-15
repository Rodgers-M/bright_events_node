import shortUuid from 'short-uuid';
import { Request } from 'express';

import { EventsFilter, RawEventBody, EventLookUpKey, CreateEventBody } from './events.types';
import { EventsResource } from './events.resource';
import {BrightEventsError} from '../../lib/util/brightEvents.error';

interface EventsService {
  get(filterBody?: EventsFilter): Promise<Readonly<RawEventBody | RawEventBody[]>>;
  create(createEventBody: CreateEventBody, request: Request): Promise<Readonly<RawEventBody>>;
  getEvent(lookup: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>>;
  filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>>;
}

interface RequestUser {
  id: string;
}

class EventsServiceImplementation implements EventsService {
  private slugify(text: string) {
    const uuid = shortUuid.generate();
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/[^\w\-]+/g, '') // remove all non-word characters
      .replace(/\-\-+/g, '-') // replace multiple - with single -
      .trim() // remove any spaces at both ends of string
      .concat('-')
      .concat(uuid); // append the uuid at the end
  }

  public async create(createEventBody: CreateEventBody, request: Request): Promise<Readonly<RawEventBody>> {
    const user = request.user as RequestUser;
    if(!user) {
      throw new BrightEventsError('Please login to continue', 401);
    }

    const slug: string = this.slugify(createEventBody.title);
    const createdEvent = await EventsResource.create({...createEventBody, slug, createdBy: user.id});
    return createdEvent;
  }

  public async get(filterBody?: EventsFilter): Promise<Readonly<RawEventBody | RawEventBody[]>> {
    if(filterBody) {
      return EventsResource.filterEvents(filterBody);
    }
  }

  public async getEvent(lookup: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>> {
    const event = await EventsResource.getEvent(lookup, value ) ;
    return event;
  }

  public async filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>> {
    const events = await EventsResource.filterEvents(filterBody);
    return events;
  }
}

export const EventsService: EventsService = new EventsServiceImplementation();
