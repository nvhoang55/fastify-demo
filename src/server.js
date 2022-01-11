import Fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import autoLoad from 'fastify-autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from '@prisma/client';

// section Init
const fastify = Fastify({
  logger: { prettyPrint: true },
});
const PORT = 5000;

// section Autoload
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fastify.register(autoLoad, {
  dir: join(__dirname, 'plugins'),
});

fastify.register(autoLoad, {
  dir: join(__dirname, 'routes'),
});

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// section Init DB
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
fastify.decorate('prisma', prisma);

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
