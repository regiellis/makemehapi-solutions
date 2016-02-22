/**
 * @file hapihello
 * @description https://github.com/hapijs/makemehapi exercises solutions
 * @author regi ellis <regi@bynine.io>
 **/

'use strict';

const Hapi = require('hapi');
const Path = require('path');

const server = new Hapi.Server()
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), (error) => {
    if (error) throw error;
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            file: Path.join(__dirname, 'index.html')
        }
    })
});

server.start(() => process.stdout.write(`Server is running at ... ${server.info.uri}`));
