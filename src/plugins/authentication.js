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
    async (email, password, done) =>
    {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          email: true,
          password: true,
        },
      })
        .then(() =>
        {
          if (!user)
          {
            return done(null, false);
          }
          if (!bcrypt.compareSync(password, user.password))
          {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    },
  ));

  fastify.decorate('passport', fastifyPassport);
});
