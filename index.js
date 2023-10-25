const { oneLineLogger } = require('@fastify/one-line-logger');
const fastify = require('fastify')({
  logger: {
    enabled: true,
    level: "debug",
    
  },
});
const metricsPlugin = require('fastify-metrics');
const Autoload = require('@fastify/autoload');
const path = require("path");
const swagger = require('./src/config/swagger')
// const config = require('./src/config/config')
// Register Swagger
fastify.register(require('@fastify/swagger'),swagger.options)
fastify.register(require('@fastify/swagger-ui'), swagger.ui_options)
// app.register(require('@fastify/jwt'), {secret: config.JWTsecret})
fastify.register(require('@fastify/cors'), {
    origin: '*',
    method: 'GET,POST'
})

fastify.register(Autoload, {
  dir: path.join(__dirname, 'src/routes')
})


fastify.register(metricsPlugin, {endpoint: '/metrics', 
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


// Run the server!
const start = async () => {
  try {
      await fastify.listen({port: 3000,host: "0.0.0.0"})
      fastify.swagger()
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
      fastify.log.error(err)
      process.exit(1)
  }
}
start()