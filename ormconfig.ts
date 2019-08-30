const { DATABASE_DIALECT, DATABASE_USER, HOST, DATABASE, DATABASE_PASSWORD } = process.env;

module.exports = {
  type: DATABASE_DIALECT,
  host: HOST,
  port: 5432,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV ? 'development' : false,
  entities: [
      'dist/database/entity/**/*.js'
   ],
   migrations: [
      'src/database/migration/**/*.ts'
   ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
