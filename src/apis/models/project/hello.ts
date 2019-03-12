'use strict';

function info(fastify: any) {
    const options = {
        method: 'GET',
        url: '/',
        schema: {
          querystring: {
            name: { type: 'string' },
            excitement: { type: 'integer' }
          },
          response: {
            200: {
              type: 'object',
              properties: {
                hello: { type: 'string' }
              }
            }
          }
        },
        handler: async function (request: any, reply: any) {
          reply.send({ hello: 'world' })
        }
    };
    fastify.server.route(options);
}

export = info;