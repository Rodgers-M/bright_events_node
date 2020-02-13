import shortUuid from 'short-uuid';

import { EventsFilter, RawEventBody, EventLookUpKey, CreateEventBody } from './events.types';
import { EventsResource } from './events.resource';

interface EventsService {
  get(filterBody?: EventsFilter): Promise<Readonly<RawEventBody | RawEventBody[]>>;
  create(createEventBody: CreateEventBody): Promise<Readonly<RawEventBody>>;
  getEvent(lookup: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>>;
  filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>>;
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

  public async create(createEventBody: CreateEventBody): Promise<Readonly<RawEventBody>> {
    const slug: string = this.slugify(createEventBody.title);
    const createdEvent = await EventsResource.create({...createEventBody, slug});
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
