/**
 * @file hapihello
 * @description https://github.com/hapijs/makemehapi exercises solutions
 * @author regi ellis <regi@bynine.io>
 **/

'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const www = function __www__ (request, reply) {
    reply("Hello hapi");
}

server.route({ method: 'GET', path: '/', handler: www });
server.start(() => process.stdout.write(`Server running at: ${server.info.uri}`));

