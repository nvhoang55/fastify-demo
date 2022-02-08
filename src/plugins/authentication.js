/* eslint-disable import/no-extraneous-dependencies,max-len */
import fastifyPassport from 'fastify-passport';
import fastifySecureSession from 'fastify-secure-session';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import * as fs from 'fs';
import path from 'path';
import fp from 'fastify-plugin';

export default fp(async (fastify) =>
{
  // set up secure sessions for fastify-passport to store data in
  fastify.register(fastifySecureSession, { key: fs.readFileSync(path.join('secret-key')) });

  // initialize fastify-passport and connect it to the secure-session storage. Note: both of these plugins are mandatory.
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.use('local', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) =>
    {
      const user = await fastify.prisma.user.findUnique({
        where: { email },
      });

      if (user === {})
      {
        return done(null, 'Invalid email or password');
      }
      if (!bcrypt.compareSync(password, user.password))
      {
        return done(null, 'Invalid email or password');
      }

      return done(null, user);
    },

  ));
  fastify.decorate('passport', fastifyPassport);
});
