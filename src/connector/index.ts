'use strict';

import Logger from '../logger';

import { MongoConnector } from './mongo-connector';
import { MysqlConnector } from './mysql-connector';

export class DBConnectManager {
    app: any;
    connectors: any;

    constructor(app: any) {
        this.app = app;
        this.connectors = {};
    }

    async init() {
        try {
            const opts: any = this.app.config.database;
            for (let opt of opts) {
                if (opt.type == 'mongo') {
                    this.connectors[opt.name] = new MongoConnector(opt);
                } else if (opt.type == 'mysql') {
                    this.connectors[opt.name] = new MysqlConnector(opt);
                } else {
                    Logger.warn('database type is not found', opt.name);
                }
            }
        } catch (error) {
            Logger.warn(error);
        }
    }

    async start() {
        try {
            for (let k in this.connectors) {
                await this.connectors[k].connect();
            }
        } catch (error) {
            Logger.warn(error);
        }
    }

    async close() {
        try {
            for (let k in this.connectors) {
                await this.connectors[k].close();
            }
        } catch (error) {
            Logger.warn(error);
        }
    }

}