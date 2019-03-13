'use strict';

import * as Config from "./config.json";
import { Service } from './apis/index';
import { DBConnectManager } from "./connector/index";
import { ApolloManage } from './ql/index'

import Logger from "./logger";

export class App {
    config: any;
    connector: any;
    server: any;
    apollo: any;

    constructor() {
        this.config = Config;

        this.connector = new DBConnectManager(this);
        this.apollo = new ApolloManage(this);
        this.server = new Service(this);
       
    }

    async init() {
        try {
            await this.connector.init();
            await this.apollo.init();
            await this.server.init();
        } catch (error) {
            Logger.warn(error);
        }
       
    }

    async start() {
        try {
            await this.connector.start();
            await this.apollo.start();
            await this.server.start();
        } catch (error) {
            Logger.warn(error);
        }
       
    }

    async close() {
        try {
            await this.connector.close();
            await this.server.close();
        } catch (error) {
            Logger.warn(error);
        }
       
    }
}