import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import autoLoad from 'fastify-autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// section Autoload
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// section Init DB
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default (opts = {}) =>
{
  const app = fastify(opts);

  // section Registers
  app.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
  });

  app.register(autoLoad, {
    dir: join(__dirname, 'routes'),
  });

  app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api' },
    },
  });

  // section Decorators
  app.decorate('prisma', prisma);

  return app;
};
