import app from './app';
import config from './config';
import logger from './util/logger';

const { port } = config;
app.listen( port, () => {
    logger.info( `Application magic happening on port: ${ port }` );
} );
