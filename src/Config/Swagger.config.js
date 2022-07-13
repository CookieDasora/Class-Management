exports.options = {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Class Management App',
      description: 'A simple backend for a class management app',
      version: '0.1.0',
    },
    tags: [
      {name: 'test', description: 'Development related endpoints'},
      {name: 'professor', description: 'Professor related endpoints'},
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};
