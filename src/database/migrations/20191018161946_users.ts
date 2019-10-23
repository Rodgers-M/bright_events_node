import * as Knex from 'knex';
import { addTableTimestamps } from '../addTableTimestamps';

const ACCOUNTS_TABLE = 'accounts';
const PROFILES_TABLE = 'profiles';

async function createUuidExtension(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"');
}

async function createAccountsTable(knex: Knex): Promise<void> {
    await knex.schema.createTable(ACCOUNTS_TABLE, (table: Knex.CreateTableBuilder): void => {

      table.string('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('email')
        .unique()
        .notNullable();

      table.string('password')
        .notNullable();

    });

    await addTableTimestamps(knex, ACCOUNTS_TABLE);
}

async function createProfileTable(knex: Knex): Promise<void> {
  await knex.schema.createTable(PROFILES_TABLE, (table: Knex.CreateTableBuilder): void => {
    table.string('id')
      .primary();

    table.string('account_id')
      .references('id')
      .inTable(ACCOUNTS_TABLE)
      .unique()
      .notNullable();

    table.string('first_name')
      .nullable();

    table.string('last_name')
      .nullable();

    table.integer('phone_number')
      .nullable();

    table.string('bio')
      .nullable();

  });

  await addTableTimestamps(knex, PROFILES_TABLE);
}

export async function up(knex: Knex): Promise<any> {
  await createUuidExtension(knex);
  await createAccountsTable(knex);
  await createProfileTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable(PROFILES_TABLE);
  await knex.schema.dropTable(ACCOUNTS_TABLE);
}
