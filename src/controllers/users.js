// const Users = data;

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'boolean' },
  },
};

// section All Users
export const getUsers = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  async handler(request, reply)
  {
    const allUsers = await this.prisma.user.findMany();
    console.log('allUsers', allUsers);
    reply.send(allUsers);
  },
};

// // section Single User
// export const getUser = {
//   schema: {
//     response: {
//       200: User,
//     },
//   },
//   handler: (request, reply) =>
//   {
//     const { id } = request.params;
//     const User = Users.find((User) => (User.id === parseInt(id)));
//
//     reply.send(User ?? `No User with id ${id}`);
//   },
// };
//
// // section Count
// export const getCount = {
//   schema: {
//     response: {
//       200: {
//         type: 'number',
//       },
//     },
//   },
//   handler: (request, reply) => reply.send(Users.length),
// };
//
// section Add a User
export const addUser = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
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
    } = request.body;

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });

    reply.send(newUser);
  },
};

// // section Delete a User
// export const deleteUser = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           message: { type: 'string' },
//         },
//       },
//     },
//   },
//   handler: (request, reply) =>
//   {
//     const { id } = request.params;
//
//     // return if not found id
//     if (!Users.some((User) => User.id === parseInt(id)))
//     {
//       reply.send(`No item with the id #${id}`);
//     }
//
//     Users = Users.filter((User) => User.id !== parseInt(id));
//     reply.send(`Successfully deleted item #${id}`);
//   },
// };
//
// section Update a User
export const updateUser = {
  schema: {
    params: {
      id: { type: 'integer' },
    },
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
      },
    },
    response: {
      200: User,
    },
  },
  async handler(request, reply)
  {
    const { id } = request.params;
    // id = parseInt(id, 10);
    const { email } = request.body;

    if (await this.prisma.user.findUnique({ where: { id } }))
    {
      await this.prisma.user.update({
        where: { id },
        data: {
          email,
        },
      });

      reply.send('Successfully updated!');
    }

    reply.send('No user with given id.');
  },
};
