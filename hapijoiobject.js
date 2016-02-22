'use strict';

const Hapi = require('hapi');
const Joi = require('Joi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
})

const www = function (request, reply) {
    reply("login successful");
}

const config = {
    validate: {
        payload: Joi.object({
            isGuest: Joi.boolean().required(),
            username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
            accessToken: Joi.string().token(),
            password: Joi.string().alphanum()
        })
        .options({ allowUnknown: true })
        .without('accessToken', 'password')
    }
}

server.route({ method: 'POST', path: '/login', handler: www, config: config })

server.start(() => process.stdout.write(`Server Running at ... ${server.info.uri}`));
