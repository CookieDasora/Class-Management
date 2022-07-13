const fp = require('fastify-plugin');
const {HelloSchema} = require('../Schemas/Index.schema');

module.exports = fp(async (fastify, opts) => {
  fastify.post('/hello', HelloSchema, (req, reply) => {
    return {hello: 'world'};
  });

  fastify.get('/', (req, reply) => {
    reply.send('res');
  });
});
