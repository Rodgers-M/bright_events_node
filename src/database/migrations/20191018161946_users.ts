import * as Knex from 'knex';
import { addTableTimestamps } from '../addTableTimestamps';

const USERS_TABLE = 'users';

async function createUuidExtension(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"');
}

async function createUsersTable(knex: Knex): Promise<void> {

    await knex.schema.createTable(USERS_TABLE, (table: Knex.CreateTableBuilder): void => {

      table.string('id')
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));

      table.string('username')
        .notNullable();

      table.string('email')
        .notNullable();

    });

    await addTableTimestamps(knex, USERS_TABLE);
}

export async function up(knex: Knex): Promise<any> {
  await createUuidExtension(knex);
  await createUsersTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable(USERS_TABLE);
}
