import app from './app';
import logger from './util/logger';

const port = 8080;
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    logger.info( `server started on port: ${ port }` );
} );
