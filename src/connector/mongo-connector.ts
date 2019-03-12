'use strict';

import { MongoClient } from 'mongodb';

export class MongoConnector {
    client: any;
    db: any;
    options: any;
    
    constructor(public opts: any) {
        this.options = opts;
        this.db = null;

        this.client = new MongoClient(this.options.url, {
            ignoreUndefined: true,
            useNewUrlParser: true
        });

    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect((err: any, client: any) => {
                if (err) return reject(err);
                this.db = client.db(this.options.base);
                resolve();
            });
        });
    }

    close(): void {
        if (this.client) {
            this.client.close();
            this.client = null;
            this.db = null;
        }
    }

    insert(collName: String, document: any): any {
        return new Promise((resolve, reject) => {
            this.db.collection(collName).insert(document, (err: any, r: any) => {
                if (err) return reject(new Error(err));
                return resolve(r.result);
            })
        });
    }

    aggregate(collName: String, query: any): any{
        return new Promise((resolve, reject) => {
            let agg = [];

            if(query.match) {
                agg.push({ $match: query.match });
            }
            
            if(query.limit) {
                agg.push({ $limit: query.limit });
            }

            if(query.project) {
                agg.push({ $project: query.project});
            }

            if(query.group) {
                agg.push({ $group: query.group});
            }

            if (query.sort) {
                agg.push({ $sort: query.sort});
            }

            this.db.collection(collName).aggregate(agg).toArray((err: any, r: any) => {
                if(err) return reject(err);
                return resolve(r);
            });

        });
    }

    find(collName: string, query: any) {
        return new Promise((resolve, reject) => {
            if (query === undefined) {
                query = {
                    where: {}
                };
            }
            let cursor = this.db.collection(collName).find(query.where);
            if (query.skip) {
                cursor = cursor.skip(query.skip);
            }
            if (query.sort) {
                cursor = cursor.sort(query.sort);
            }
            if (query.limit) {
                cursor = cursor.limit(query.limit);
            }
            if (query.project) {
                cursor = cursor.project(query.project);
            }
            cursor.toArray((err: any, r: any) => {
                if (err) return reject(err);
                return resolve(r);
            });
            
        });
    }

    findById (collName: string, id: string, opts: any) {
        return new Promise((resolve, reject) => {
            this.db.collection(collName).findOne({_id: id}, opts, (err: any, r: any) => {
                if (err) return reject(err);
                resolve(r);
            });
        });      
    }

}