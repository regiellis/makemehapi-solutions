'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(require('vision'), (error) => {
    if (error) throw error;
    server.views({
        engines: { html: require('handlebars') },
        relativeTo: __dirname,
        path: 'templates/',
        helpersPath: 'helpers'
    })
})

const www = (request, reply) => {
    reply.view('helper.html', { query: request.query })
}

server.route({ method: 'GET', path: '/', handler: www })
server.start(() => process.stdout.write(`Server is running ... ${server.info.uri}`));
