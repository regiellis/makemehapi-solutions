
'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), (error) => {
    if (error) throw error;
    server.route({
        method: 'GET',
        path: '/foo/bar/baz/{file}',
        handler: {
            directory: {
                path: `${Path.join(__dirname, 'public/')}`
            }
        }
    })
});

server.start(() => process.stdout.write(`Server is running at ... ${server.info.uri}`));
