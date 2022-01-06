import Fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import todoRoutes from './routes/todos.js';

// section Init
const fastify = Fastify({
  logger: { prettyPrint: true },
});
const PORT = 5000;

// section Pluggins
fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// section Routes
fastify.get('/', (request, reply) =>
{
  reply.send({ hello: 'world' });
});

fastify.register(todoRoutes, { prefix: 'todos' });

// section Start server
const start = async () =>
{
  try
  {
    await fastify.listen(PORT);
  }
  catch (err)
  {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
