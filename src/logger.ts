'use strict';

import * as Config from './config.json';
import { default as Poplar } from 'poplar-logger';

const logger = new Poplar({
    level: Config.Logger.level,
    pretty: Config.Logger.pretty,
    title: Config.Logger.title,
    color: Config.Logger.color
});

export default logger;