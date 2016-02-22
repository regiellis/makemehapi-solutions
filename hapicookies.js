'use strict';

/**
 * @file hapihello
 * @description https://github.com/hapijs/makemehapi exercises solutions
 * @author regi ellis <regi@bynine.io>
 **/

const Hapi = require('hapi');
const Boom = require('boom');
const server = new Hapi.Server();

server.connection({ host: 'localhost', port: Number(process.argv[2] || 8080 )});

const set_cookie = function _set_cookie_ (request, reply) {
    return reply({}).state('session', { key: 'makemehapi' }, {
        encoding: 'base64json',
        ttl: 10,
        domain: 'localhost',
        path: '/'
    })
}

const check_cookie = function _check_cookie_ (request, reply) {
    const session = (request.state.session === {}) 
        ? {user: 'hapi'}
        : Boom.badRequest('Invalid cookie value');
    reply(session);
}

const config = {
    state: {
        parse: true,
        failAction: 'log'
    }
}

server.route({ method: 'GET', path: '/set-cookie', handler: set_cookie, config: config });
server.route({ method: 'GET', path: '/check-cookie', handler: check_cookie, config: config });

server.start(() => process.stdout.write(`Server running at: ${server.info.uri}`));
