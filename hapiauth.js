'use strict';

/**
 * @file hapihello
 * @description https://github.com/hapijs/makemehapi exercises solutions
 * @author regi ellis <regi@bynine.io>
 **/

const Hapi = require('hapi');
const Boom = require('boom');
const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const validate = function __validate__ (request, username, password, func) {
    if (!username) return func(null, false);
    return (password === 'auth') 
        ? func(null, true, {username: username})
        : func(null, false, Boom.unauthorized('Unauthorized User'))
}

const www = function __www__ (request, reply) {
    reply(`Welcome ${request.auth.credentials.username}`)
}

server.register(require('hapi-auth-basic'), function (error) {
    if (error) throw error;
    server.auth.strategy('simple', 'basic', {
        validateFunc: validate
    })
});


server.route({ method: 'GET', path: '/',
    config : {
        auth: 'simple',
        handler: www
    }
})

server.start(() => `Server started at: ${server.info.uri}`);
