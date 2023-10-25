const fp = require('fastify-plugin')
const metricsPlugin = require('fastify-metrics');

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(metricsPlugin, {endpoint: '/metrics', 
  routeMetrics: {
    overrides: {
      histogram: {
        name: 'my_custom_http_request_duration_seconds',
        buckets: [0.1, 0.5, 1, 3, 5],
      },
      summary: {
        help: 'custom request duration in seconds summary help',
        labelNames: ['status_code', 'method', 'route','message'],
        percentiles: [0.5, 0.75, 0.9, 0.95, 0.99],
      },
    }
  }
})
})