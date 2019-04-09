'use strict';

import * as mysql from 'mysql';

export class MysqlConnector {
    client: any;
    options: any;

    constructor(public opts: any) {
        this.options = opts;

        this.client = mysql.createConnection(this.options.ops);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect((err: any) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
              });
        });
    }

    close(): void {
        if(this.client) {
            this.client.end();
            this.client = null;
        }
    }

}