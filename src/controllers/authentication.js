export default async (fastify, options, done) =>
{
  fastify.post('/register', register);

  fastify.get('/login', login);

  done();
};
