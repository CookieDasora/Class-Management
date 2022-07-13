const fp = require('fastify-plugin')
const mongoose = require('mongoose')

module.exports = fp(async function (fastify, opts) {
  const URI = process.env.DB_URI
  try {
    await mongoose.connect(URI)
    const db = mongoose.connection
    fastify.decorate('mongoose', mongoose)
    fastify.decorate('db', db)
    fastify.addHook('onClose', async (server) => {
      await server.db.close()
    })
  } catch (e) {
    fastify.log.error(e)
  };
})
