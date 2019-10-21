import { Config } from 'knex';
import path from 'path';

import { getConfig } from '../config/config';

const { env, db : { name, username, password, host, testDbName } } = getConfig();

let connectionString = `postgresql://${ username }:${ password }@${ host }/${ name }`;

if (env === 'test') {
  connectionString = `postgresql://${ username }:${ password }@${ host }/${ testDbName }`;
}
const defaultOptions: Config = {
    client: 'pg',
    connection: connectionString,
    migrations: {
        directory: path.join(__dirname, 'migrations'),
    },
};

interface Configs {
    [ key: string ]: Config;
}

const configs: Configs = {
    development: defaultOptions,
    staging: defaultOptions,
    production: defaultOptions,
    local: defaultOptions,
    test: defaultOptions,
};

if (configs[env] === undefined) {
    throw Error(`Missing configuration for environment: ${ env }`);
}

module.exports = configs;
