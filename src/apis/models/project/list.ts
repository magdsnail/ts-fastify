'use strict';

async function list(fastify: any) {
    const db: any = fastify.app.connector.connectors;
    fastify.server.get('/project/list', async (request: any, reply: any) => {
        const projects = await db.testDB.find('Book');
        const data: any = [];
        projects.forEach((element: any) => {
            data.push({
                id: element._id.toString(),
                title: element.title
            });
        });
        reply.send({ 
            item: data 
        })
    });
}

export = list;