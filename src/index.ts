import app from './app';
import { getConfig } from './config/config';
import logger from './shared/logger';

const { port } = getConfig();

app.listen( port, () => {
  logger.info( `Application magic happening on port: ${ port }` );
} );
