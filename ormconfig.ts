const { DATABASE_DIALECT, DATABASE_USER, DB_HOST, DATABASE, DATABASE_PASSWORD } = process.env;

module.exports = {
  type: DATABASE_DIALECT,
  host: DB_HOST,
  port: 5432,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV ? 'development' : false,
  entities: [
    'dist/**/*.model.js'
   ],
   migrations: [
      'src/database/migration/**/*.ts'
   ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
