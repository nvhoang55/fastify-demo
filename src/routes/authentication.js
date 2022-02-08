import { register } from '../controllers/authentication.js';

export default async (fastify, options, done) =>
{
  fastify.post('/register', register);

  fastify.post('/test', {
    handler(request, reply)
    {
      reply.send('testing');
    },
  });

  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
    // preValidation: fastify.passport.authenticate('local', {
    //   authInfo: false,
    //   session: false,
    // }),
    async handler(request, reply)
    {
      // take the user object from authenticated request
      // return jwt signatute for it
      const payload = request.user;
      // const token = fastify.jwt.sign({ payload });
      // reply.send({ token });
      reply.send(payload);
    },
  });

  done();
};
