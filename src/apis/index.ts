'use strict';

import { default as fastify } from 'fastify';
import * as http from 'http'
import { default as cors } from 'cors';

import models from './models';
import Logger from '../logger';

export class Service {
    server: any;

    constructor(public app: any) {
        this.app = app;

        this.server = fastify({
            logger: Logger.info
        });

    }

    async loadMethods() {
        try {
            for(let k in models) {
                if(models[k].methods) {
                    for(let v of models[k].methods) {
                        const methodPath: string = `${models[k].path}/${v.name}`;
                        const method = require(methodPath);
                        await method(this);
                    }
                }
            }

        } catch (error) {
            Logger.warn(error);
        }
    }

    async init() {
        await this.loadMethods();
        this.server.addHook('onClose', (instance: any, done: any) => {
            Logger.info(`server is closed.`);
            done();
        });

        this.server.use(cors());
        this.server.decorate('dbconnects', this.app.connector.connectors);
    }

    start() {
        const { port, host } = this.app.config.server;
        return new Promise((resolve, reject) => {
            this.server.listen(port, host, (err: Error, address: String) => {
                if (err) {
                    process.exit(1);
                    return reject(err)
                }
                return resolve();
            });
        });
    }

    close() {
        if (this.server) {
            this.server.close();
        }
    }

}
