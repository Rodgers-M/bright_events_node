import * as Knex from 'knex';
import { addTableTimestamps } from '../addTableTimestamps';

const EVENTS_TABLE_NAME = 'events';
const RSVPS_TABLE_NAME = 'rsvps';
const ACCOUNTS_TABLE_NAME = 'accounts';

async function addDocumentPopulationTrigger(knex: Knex, tableName: string) {
  await knex.raw(
    `
    CREATE OR REPLACE FUNCTION populate_events_document()
    RETURNS TRIGGER
    SET SCHEMA 'public'
    LANGUAGE plpgsql
    AS $$
    BEGIN
      NEW.document = setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A')
      || setweight(to_tsvector('english', coalesce(NEW.location, '')), 'B')
      || setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C');
      RETURN NEW;
    END;
    $$;

    CREATE TRIGGER populate_events_document_trigger
      BEFORE INSERT OR UPDATE ON "${ tableName }"
      FOR EACH ROW
      EXECUTE PROCEDURE populate_events_document();

    CREATE INDEX document_index
      ON ${ tableName }
      USING GIN("document");
    `
  );
}

async function createEventsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(EVENTS_TABLE_NAME, (table: Knex.CreateTableBuilder): void => {
    table.string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('title')
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

    table.specificType('document', 'tsvector');
  });

  await addTableTimestamps(knex, EVENTS_TABLE_NAME);
  await addDocumentPopulationTrigger(knex, EVENTS_TABLE_NAME);
}

async function createRsvpsTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(RSVPS_TABLE_NAME, (table: Knex.CreateTableBuilder): void => {
    table.string('account_id')
      .references('id')
      .inTable(ACCOUNTS_TABLE_NAME)
      .onDelete('CASCADE')
      .notNullable();

    table.string('event_id')
      .references('id')
      .inTable(EVENTS_TABLE_NAME)
      .onDelete('CASCADE')
      .notNullable();

    table.boolean('attended')
      .notNullable()
      .defaultTo(false);

    table.boolean('cancelled')
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
