export default async (fastify, options, done) =>
{
  // section All todos
  fastify.get('/', (request, reply) =>
  {
    reply.send('Hello, world!');
  });

  done();
};
