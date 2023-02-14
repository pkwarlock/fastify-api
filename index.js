const fastify = require('fastify');
const app = fastify({
    logger: true
});
const metricsPlugin = require('fastify-metrics');

app.register(metricsPlugin, { endpoint: '/metrics' });


app.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
  
  // Run the server!
app.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
// Server is now listening on ${address}
})