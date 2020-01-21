import { EventsFilter, RawEventBody } from './events.types';
import { EventsResource } from './events.resource';

interface EventsService {
  filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>>;
}

class EventsServiceImplementation {
  public async filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>> {
    const events = await EventsResource.filterEvents(filterBody);
    return events;
  }
}

export const EventsService: EventsService = new EventsServiceImplementation();
