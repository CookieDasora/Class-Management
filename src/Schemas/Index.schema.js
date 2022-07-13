exports.HelloSchema = {
  schema: {
    description: 'Test endpoint',
    tags: ['test'],
    summary: 'A simple endpoint for tests',
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          hello: {type: 'string'},
        },
      },
    },
  },
};
