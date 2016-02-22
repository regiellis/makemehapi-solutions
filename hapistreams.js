'use strict';

const Hapi = require('hapi');
const FileSystem = require('fs');
const ROT13 = require('rot13-transform');

const server = new Hapi.Server();
const fp = FileSystem.createReadStream('./streams.txt', 'utf-8');

const www = function _streaming_route_ (request, reply) {
    reply(fp.pipe(ROT13()));
}

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({ method: 'GET', path: '/', handler: www });

server.start(() => process.stdout.write(`Server running at ... ${server.info.uri}\n`));
