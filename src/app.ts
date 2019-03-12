'use strict';

import * as Config from "./config.json";
import { Service } from './apis/index';
import { DBConnectManager } from "./connector/index";

export class App {
    config: any;
    connector: any;
    server: any;
    
    constructor() {
        this.config = Config;

        this.connector = new DBConnectManager(this);
        this.server = new Service(this);
    }

    async init() {
        await this.connector.init();
        await this.server.init();
    }

    async start() {
        await this.connector.start();
        await this.server.start();
    }

    async close() {
        await this.connector.close();
        await this.server.close();
    }
}