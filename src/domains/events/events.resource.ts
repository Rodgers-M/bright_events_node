import * as knex from 'knex';
import { knexInstance } from '../../database/knexInstance';
import {
  EventBody,
  RawEventBody,
  EventLookUpKey,
  UpdateEventBody,
  EventsFilter,
  EventsFilterFields,
  QueryBuilderFunction,
} from './events.types';
import { EventNotFountError } from './events.errors';
import { pipe } from '../../lib/util/functionalUtils';

const EVENTS_TABLE = 'events';

interface EventsResource {
  create(eventBody: EventBody): Promise<Readonly<RawEventBody>>;
  get(lookupKey: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>>;
  filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>>;
  getAll(offset: number, limit: number): Promise<Readonly<RawEventBody[]>>;
  update(updateBody: UpdateEventBody, eventId: string): Promise<Readonly<RawEventBody>>;
  delete(eventId: string): Promise<void>;
}

class EventsResourceSingleton implements EventsResource {

  private filterbyField(field: EventsFilterFields, value: string): QueryBuilderFunction {
    return (query: knex.QueryBuilder): knex.QueryBuilder => query.where(field, value);
  }

  private filterByDate(date: string): QueryBuilderFunction {
    return (query: knex.QueryBuilder): knex.QueryBuilder => query.where('date', date);
  }

  public async create(eventBody: EventBody): Promise<Readonly<RawEventBody>> {
    const created = await knexInstance<RawEventBody>(EVENTS_TABLE)
      .insert(eventBody, '*');
    return created[0];
  }

  public async get(lookupKey: EventLookUpKey, value: string): Promise<Readonly<RawEventBody>> {
    const event = knexInstance<RawEventBody>(EVENTS_TABLE)
      .where(lookupKey, value)
      .first();

    if(!event) {
      throw new EventNotFountError(`no event with ${lookupKey} ${value} found`);
    }
    return event;
  }

  private double(x: number): number {
    return x * 2;
  }

  public async filterEvents(filterBody: EventsFilter): Promise<Readonly<RawEventBody[]>> {
    const baseQuey = knexInstance(EVENTS_TABLE);
    const filterbyLocation = this.filterbyField(EventsFilterFields.LOCATION, filterBody.location);
    const filterByDate = this.filterByDate('2018-12-12');
    const  queryBuilder = pipe<knex.QueryBuilder>(filterbyLocation, filterByDate);
    const query = queryBuilder(baseQuey);
    console.log(query.toString());
    return await query;
  }

  public async getAll(offset: number, limit: number): Promise<Readonly<RawEventBody[]>> {
    const events = await knexInstance<RawEventBody>(EVENTS_TABLE)
      .select('*')
      .offset(offset)
      .limit(limit);

    if(!events.length) {
      throw new EventNotFountError('no events found that match your query', 404);
    }

    return events;
  }

  public async update(updateBody: UpdateEventBody, eventId: string): Promise<Readonly<RawEventBody>> {
    const updatedEvent = await knexInstance<RawEventBody>(EVENTS_TABLE)
      .update(updateBody)
      .where('id', eventId)
      .returning('*');

    return updatedEvent[0];
  }

  public async delete(eventId: string): Promise<void> {
    await knexInstance<RawEventBody>(EVENTS_TABLE)
      .delete()
      .where('id', eventId);
  }
}

export const EventsResource: EventsResource = new EventsResourceSingleton();
