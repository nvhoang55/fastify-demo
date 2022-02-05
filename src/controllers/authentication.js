import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// section Register
export const register = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  async handler(request, reply)
  {
    const {
      name,
      email,
      password,
    } = request.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    reply.send(newUser);
  },
};

// section Login
// export const login = {
//   schema: {
//     body: {
//       type: 'object',
//       required: ['email', 'password'],
//       properties: {
//         email: { type: 'string' },
//         password: { type: 'string' },
//       },
//     },
//     response: {
//       201: {
//         type: 'object',
//         properties: {
//           token: { type: 'string' },
//         },
//       },
//     },
//   },
//   preValidation: [this.localAuthenticate],
//   async handler(request, reply)
//   {
//     // take the user object from authenticated request
//     // return jwt signatute for it
//     const payload = request.user;
//     const token = this.jwt.sign({ payload });
//     reply.send({ token });
//   },
// };
