import app from './app';
import logger from './util/logger';

const port = 8080;
app.listen( port, () => {
    logger.info( `Application magic happening on port: ${ port }` );
} );
