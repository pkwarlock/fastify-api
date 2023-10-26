const fp = require('fastify-plugin')
// require('./openTelemetryConfig')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@autotelic/fastify-opentelemetry'), { wrapRoutes: true })
//   // openTelemetryConfig.js
    const {
      BatchSpanProcessor,
      // ConsoleSpanExporter,
      TraceIdRatioBasedSampler
    } = require('@opentelemetry/sdk-trace-base')

//     const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node')


// Note: the above is just a basic example. fastify-opentelemetry is compatible with any
// @opentelemetry/api configuration.


const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter,NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
// Configure a tracer provider.
    const provider = new NodeTracerProvider({
      sampler: new TraceIdRatioBasedSampler(0.5)
    })

// Add a span exporter.
    provider.addSpanProcessor(
      new BatchSpanProcessor(new ConsoleSpanExporter())
    )

// Register a global tracer provider.
    provider.register()
const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

// sdk.start();
})