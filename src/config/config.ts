import joi from '@hapi/joi';

const envVarsSchema = joi
.object({
  NODE_ENV: joi
    .string()
    .allow(['development', 'production', 'test', 'staging'])
    .required(),
  PORT: joi.number().default(8080),

  // database
  DATABASE: joi.string().required(),
  DATABASE_DIALECT: joi.string().default('postgres'),
  DATABASE_PASSWORD: joi.string().default(null),
  DATABASE_USER: joi.string().required(),
  DATABASE_URL: joi.string().default(null),
  DB_HOST: joi.string().required(),
  SECRET_KEY: joi.string().required(),
  JWT_EXPIRATION: joi.number().default(1),
  JWT_EXPIRATION_UNIT: joi.string().allow(['seconds', 'minutes', 'hours', 'days', 'months']).default('hours')
})
.unknown()
.required();

type NodeEnv = 'development'| 'staging' | 'production' | 'test' | 'local';

export interface AppConfig {
  env: NodeEnv;
  port: number;
  db: {
    name: string;
    username: string;
    dialect: string;
    password: string;
    host: string;
  };
  jwt: {
    secretKey: string;
    expiresIn: number;
    expirationUnit: string;
  };
}

let config: AppConfig;
export const getConfig = () => {
  if (!config) {
    // joi validates the env variables hence safe to cast process.env as 'any'
    const { error, value: envVars } = joi.validate(process.env as any, envVarsSchema);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    config = {
      env: envVars.NODE_ENV ,
      port: envVars.PORT,
      db: {
        name: envVars.DATABASE,
        username: envVars.DATABASE_USER,
        dialect: envVars.DATABASE_DIALECT,
        password: envVars.DATABASE_PASSWORD,
        host: envVars.DB_HOST,
      },
      jwt: {
        secretKey: envVars.SECRET_KEY,
        expiresIn: envVars.JWT_EXPIRATION,
        expirationUnit: envVars.JWT_EXPIRATION_UNIT,
      }
    };
  }

  return config;
};
