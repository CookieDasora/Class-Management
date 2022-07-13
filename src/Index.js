require('dotenv').config()
const fastify = require('fastify')({ logger: true })

fastify.register(require('@fastify/swagger'), {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Class Management App',
      description: 'A simple backend for a class management app',
      version: '0.1.0'
    },
    tags: [
      { name: 'test', description: 'Development related endpoints' },
      { name: 'professor', description: 'Professor related endpoints' }
    ],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
})

fastify.register(require('@fastify/rate-limit'), {
  global: false,
  max: 3000
})
fastify.register(require('./Plugins/Database'))
fastify.register(require('./Routes/Index'))
fastify.register(require('./Routes/Professor'))

const port = 8080 || process.env.PORT

fastify.setErrorHandler((error, req, reply) => {
  if (reply.statusCode === 429) {
    error.message = 'Que isso rapaz! Tenha calma meu filho. Você está impossível!'
  };
  reply.send(error)
})

fastify.listen({ port }, async function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  };
  await fastify.ready()
  fastify.swagger()
})
