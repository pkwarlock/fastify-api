const fp = require('fastify-plugin')
const swagger = require('../config/swagger')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/cors'), {
    origin: '*',
    method: 'GET,POST'
  })
})