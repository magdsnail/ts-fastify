'use strict';

import { default as FastifyApolloStep } from 'fastify-apollo-step';

import models from "./models";

export class ApolloManage {
    apollo: any;
    params: any;

    constructor(apo: any) {
        this.apollo = apo;
        this.params = {};
    }

    init() {
        return new Promise((resolve, reject) => {
            this.params = {
                path: '/ql',
                typeDefs: this.typeDefs(),
                resolvers: this.resolvers(),
                graphiql: {
                    enabled: true,
                    path: '/iql'
                }
            }

            resolve();
        })
    }

    typeDefs(): any[] {
        const ret: Array<any> = [];

        ret.push(`type Query {
            version: String!
        }
        type Mutation {
            mock: String!
        }
        `);

        for(let k in models) {
            ret.push(require(`${models[k].path}/schema`));
        }

        return ret;
    }

    resolvers(): any[] {
        const ret: Array<any> = [];

        for(let k in models) {
            ret.push(require(`${models[k].path}/resolver`));
        }

        return ret;
    }

    start() {
        return new Promise((resolve, reject) => {
            this.apollo.server.server.register(FastifyApolloStep, this.params);
            resolve();
        });
    }

}
