import joi from '@hapi/joi';
import dotenv from 'dotenv';

dotenv.config();

const envVarsSchema = joi
.object({
  NODE_ENV: joi
    .string()
    .allow(['development', 'production', 'test', 'staging'])
    .required(),
  PORT: joi.number().default(8080),

  // database
  DATABASE: joi.string().required(),
  TEST_DB: joi.string().default('events_test_db'),
  DATABASE_DIALECT: joi.string().default('postgres'),
  DATABASE_PASSWORD: joi.string().default(null),
  DATABASE_USER: joi.string().required(),
  DATABASE_URL: joi.string().default(null),
  DB_HOST: joi.string().required(),
})
.unknown()
.required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT,
  db: {
    name: envVars.DATABASE,
    testDbName: envVars.TEST_DB,
    username: envVars.DATABASE_USER,
    dialect: envVars.DATABASE_DIALECT,
    password: envVars.DATABASE_PASSWORD,
    url: envVars.DATABASE_URL,
    host: envVars.DB_HOST,
  },
};

export default config;
