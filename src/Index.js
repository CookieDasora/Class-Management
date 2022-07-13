require('dotenv').config();
const fastify = require('fastify')({logger: true});
const swagger = require('./Config/Swagger.config');
const ratelimit = require('./Config/Ratelimit.config');

fastify.register(require('@fastify/swagger'), swagger.options);
fastify.register(require('@fastify/rate-limit'), ratelimit.options);
fastify.register(require('./Plugins/Database.plugin'));
fastify.register(require('./Routes/Index.route'));
fastify.register(require('./Routes/Professor.route'));

const port = 8080 || process.env.PORT;

fastify.setErrorHandler((error, req, reply) => {
  if (reply.statusCode === 429) {
    error.message = `Que isso rapaz! Tenha calma meu filho. Você está impossível!`;
  };
  reply.send(error);
});

fastify.listen({port}, async function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  };
  await fastify.ready();
  fastify.swagger();
});
