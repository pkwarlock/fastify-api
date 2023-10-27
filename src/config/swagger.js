exports.options = {
  mode: 'dynamic',
  swagger: {
    info: {
      title: 'Test API for Opentelemetry',
      description: 'Fastify swagger API',
      version: '0.1.0'
    },
    
    securityDefinitions: {
      authorization: {
      type: 'apiKey',
      name: 'authorization',
        in: 'header'
      }
    }
  },
  exposeRoute: true
}

exports.ui_options = {
  routePrefix: '/documentation',
}
