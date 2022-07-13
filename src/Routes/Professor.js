const FastifyAuth = require('@fastify/auth')
const ProfessorHandler = require('../Handlers/Professor.handler')
const Professor = require('../Models/Professor.model')
const { registerProfessor } = require('../Schemas/Professor.schema')

const professorRoutes = async (fastify, opts) => {
  fastify
    .decorate('verifyJwt', async (req, reply) => {
      try {
        if (!req.headers.authorization) {
          throw new Error('No token was sent')
        };
        const token = req.headers.authorization.replace('Bearer ', '')
        const user = await Professor.findByToken(token)
        if (!user) {
          throw new Error('Authentication failed')
        };
        req.user = user
        req.token = token
      } catch (e) {
        reply.code(401).send(e)
      };
    })
    .decorate('verifyUsernameAndPassword', async (req, reply) => {
      try {
        if (!req.body) {
          throw new Error('No body was sent!')
        }
        const user = await Professor.findByCredentials(
          req.body.username,
          req.body.password)
        req.user = user
      } catch (error) {
        reply.code(400).send(error)
      };
    })
    .register(FastifyAuth)
    .after(() => {
      fastify.post('/professor/register',
        registerProfessor,
        async (req, reply) => {
          const { firstName, lastName, email, password } = req.body

          const service = new ProfessorHandler()
          const result = await service.register({
            firstName,
            lastName,
            email,
            password
          })

          if (result instanceof Error) {
            return reply.code(400).send({
              error: result.message
            })
          };

          if (result === null) {
            return reply.code(400).send({
              error: 'Object is null'
            })
          };

          return reply.send({ professor: result })
        })
    })
}

module.exports = professorRoutes
