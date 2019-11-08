import { app } from './app';
import { getConfig } from './config/config';

const { port } = getConfig();

app.start(port);
