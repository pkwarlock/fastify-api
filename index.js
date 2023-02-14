const fastify = require('fastify');
const app = fastify({
    logger: true
});
const metricsPlugin = require('fastify-metrics');

app.register(metricsPlugin, {endpoint: '/metrics', 
  routeMetrics: {
    overrides: {
      histogram: {
        name: 'my_custom_http_request_duration_seconds',
        buckets: [0.1, 0.5, 1, 3, 5],
      },
      summary: {
        help: 'custom request duration in seconds summary help',
        labelNames: ['status_code', 'method', 'route'],
        percentiles: [0.5, 0.75, 0.9, 0.95, 0.99],
      },
    }
  }
});


app.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
  
  // Run the server!
app.listen({port: 3000,host: "0.0.0.0"}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
// Server is now listening on ${address}
})