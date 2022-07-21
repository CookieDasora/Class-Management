exports.registerProfessorSchema = {
  config: {
    rateLimit: {
      max: 3
    }
  },

  schema: {
    description: 'Register a professor',
    tags: ['professor'],
    summary: 'Creates a professor account',
    body: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }

      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          professor: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            _id: { type: 'string' },
            tokens: [{ token: { type: 'string' }, _id: { type: 'string' } }]
          }
        }
      },
      400: {
        description: 'Error response',
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    }
  }
}
