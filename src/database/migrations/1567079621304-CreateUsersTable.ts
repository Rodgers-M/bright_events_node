import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateUsersTable1567079621304 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
      id: SERIAL PRIMARY KEY,
      first_name VARCHAR,
      last_name VARCHAR,
      email VARCHAR,
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE 'users'`);
  }
}
