import Knex from 'knex';

import { getConfig } from '../config/config';
import * as configs from './knexfile';

/* tslint:disable-next-line */
const knexStringCase = require('knex-stringcase');

const config: Knex.Config = (configs as any)[getConfig().env];

if (!config) {
    throw new Error('Missing database config');
}

export const knexInstance: Knex = Knex(knexStringCase(config));
