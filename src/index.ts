import { App } from './app';
import { getConfig } from './config/config';
import { logger } from './shared/logger';
import { handleSignals } from './singalHandlers';

const { port } = getConfig();

const app = new App();

app.start(port);

handleSignals(logger, app);
