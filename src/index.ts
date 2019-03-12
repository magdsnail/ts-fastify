'use strict';

import { App } from './app';
import Logger from './logger';

const app = new App();

async function start() {
    try {
        await app.init();
        await app.start();
        Logger.info('server start success.');
    } catch (err) {
        Logger.warn(err);
    }
}

process.on('SIGINT', () => {
    Logger.info('exit.');
    app.close();
});

start();