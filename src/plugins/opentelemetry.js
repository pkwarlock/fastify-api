const fp = require('fastify-plugin')
// require('./openTelemetryConfig')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  // fastify.register(require('@autotelic/fastify-opentelemetry'), { wrapRoutes: true })
const { NodeTracerProvider } = require('@opentelemetry/node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');


const provider = new NodeTracerProvider({resource: new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'your-service-name',
})});
provider.register();

fastify.addHook('onRequest', (request, reply, done) => {
  registerInstrumentations({
    instrumentations: [
      // Fastify instrumentation expects HTTP layer to be instrumented
      new HttpInstrumentation(),
      new FastifyInstrumentation(),
    ],
  })
  done()
})
})