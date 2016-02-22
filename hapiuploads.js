'use strict';

const Hapi = require('hapi');
const FileSystem = require('fs');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

const upload = function (request, reply) {
    let content = '';
    request.payload.file.on('data', (data) => content += data);
    request.payload.file.on('end', () => reply({
        description: request.payload.description,
        file: {
            data: content,
            filename: request.payload.file.hapi.filename,
            headers: request.payload.file.hapi.headers
        }
    }));
}

server.route({
    method: 'POST',
    path: '/upload',
    handler: upload,
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.start(() => server.log('Server started on:', server.info.uri));

