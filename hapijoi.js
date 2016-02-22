'use strict';

const Hapi = require('hapi');
const Joi = require('Joi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const www = function(request, reply) {
    reply(`The chickens are near ... ${request.params.breed}`);
}

const route_config = {
    validate: {
        params: { breed: Joi.string().required() }
    }
}

server.route({
    method: 'GET',
    path: '/chickens/{breed}',
    handler: www,
    config: route_config
})

server.start(() => process.stdout.write(`Server running at ... ${server.info.uri}`));

