const { oneLineLogger } = require('@fastify/one-line-logger');
const mongoose = require('mongoose')
const fastify = require('fastify')({
  logger: {
    level: 'info',
    serializers: {
      res (reply) {
        // The default
        return {
          statusCode: reply.statusCode,
          message: reply.message
        }
      },
      req (request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          // Including the headers in the log could be in violation
          // of privacy laws, e.g. GDPR. You should use the "redact" option to
          // remove sensitive fields. It could also leak authentication data in
          // the logs.
          headers: request.headers
        };
      }
    }
  },
});
const Autoload = require('@fastify/autoload');
const path = require("path");
const config = require('./src/config/config')

const swagger = require('./src/config/swagger')
fastify.register(require('@fastify/swagger'), swagger.options)
fastify.register(require('@fastify/swagger-ui'), swagger.ui_options)

fastify.register(Autoload, {
  dir: path.join(__dirname, 'src/plugins')
})
fastify.register(Autoload, {
  dir: path.join(__dirname, 'src/routes')
})


// // console.log(config.mongoUri)
mongoose.connect(config.config.mongoUri, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected… => ', config.config.mongoUri))
    .catch(err => console.log(err.message, "mongo URI => ", process.env.MONGO_URI))
// Run the server!
const start = async () => {
  try {
      await fastify.listen({port: 8000,host: "0.0.0.0"})
      // fastify.swagger()
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
      fastify.log.error(err)
      process.exit(1)
  }
}
start()