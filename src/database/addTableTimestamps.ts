import Knex, { CreateTableBuilder } from 'knex';

// Alters the given table by creating a postgres function that updates the updated_at
// timestamp column of the updated row. This function gets triggered before the update occurs.
export async function addTableTimestamps(knex: Knex, tableName: string): Promise<void> {
    await knex.schema.alterTable(tableName, (table: CreateTableBuilder) => {
        table.timestamps(true, true);
    });

    // Create a PG function that updates the update_at column before the update actually occurs
    await knex.raw(`
        CREATE OR REPLACE FUNCTION update_modified_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TRIGGER update_${ tableName }_updated_at
        BEFORE UPDATE ON "${ tableName }"
        FOR EACH ROW
        EXECUTE PROCEDURE update_modified_column();
    `);
}
