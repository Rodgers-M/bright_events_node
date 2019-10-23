import * as Knex from 'knex';
import { addTableTimestamps } from '../addTableTimestamps';

const EVENTS_TABLE_NAME = 'events';
const RSVPS_TABLE_NAME = 'rsvps';
const ACCOUNTS_TABLE_NAME = 'accounts';

export  async function createEventsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(EVENTS_TABLE_NAME, (table: Knex.CreateTableBuilder): void => {
    table.string('id')
      .primary();

    table.string('tittle')
      .notNullable();

    table.string('slug')
      .notNullable()
      .unique();

    table.text('description')
      .notNullable();

    table.string('location')
      .notNullable();

    table.date('date')
      .notNullable();

    table.time('time')
      .notNullable();

    table.date('rsvp_end_date')
      .nullable();

    table.string('created_by')
      .references('id')
      .inTable(ACCOUNTS_TABLE_NAME)
      .notNullable();
  });

  await addTableTimestamps(knex, EVENTS_TABLE_NAME);
}

export  async function createRsvpsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(RSVPS_TABLE_NAME, (table: Knex.CreateTableBuilder): void => {
    table.string('account_id')
      .references('id')
      .inTable(ACCOUNTS_TABLE_NAME)
      .notNullable();

    table.string('event_id')
      .references('id')
      .inTable(EVENTS_TABLE_NAME)
      .notNullable();

    table.boolean('attended')
      .notNullable()
      .defaultTo(false);

    table.unique(['event_id', 'account_id']);

  });

  await addTableTimestamps(knex, RSVPS_TABLE_NAME);
}

export async function up(knex: Knex): Promise<any> {
  await createEventsTable(knex);
  await createRsvpsTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable(RSVPS_TABLE_NAME);
  await knex.schema.dropTable(EVENTS_TABLE_NAME);
}
