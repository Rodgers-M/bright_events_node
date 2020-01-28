import { EventsFilter, RawEventBody, EventLookUpKey } from './events.types';
import { EventsResource } from './events.resource';

interface EventsService {
  get(filterBody?: EventsFilter): Promise<Readonly<RawEventBody | RawEventBody[]>>;
  getEvent(lookup: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>>;
  filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>>;
}

class EventsServiceImplementation {
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
