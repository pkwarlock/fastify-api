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
const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');

const provider = new NodeTracerProvider({resource: new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'your-service-name',
})});
provider.register();

fastify.addHook('onRequest', (request, reply, done) => {
  const {origin} = request.headers
  const sdk = new opentelemetry.NodeSDK({
    traceExporter: new OTLPTraceExporter({
      // optional - default url is http://localhost:4318/v1/traces
      url: 'http://localhost:16686/v1/traces',
      // optional - collection of custom headers to be sent with each request, empty by default
      headers: { origin : origin},
    }),
    
    instrumentations: [
      // getNodeAutoInstrumentations(),
      new HttpInstrumentation(),
      new FastifyInstrumentation(),
    ],
  })
  // registerInstrumentations({
  //   instrumentations: [
  //     // Fastify instrumentation expects HTTP layer to be instrumented
      // new HttpInstrumentation(),
      // new FastifyInstrumentation(),
  //   ],
  // })
  done()
})
})