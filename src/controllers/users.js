import User from '../models/user.js';

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
    reply.send(allUsers);
  },
};

// section Single User
export const getUser = {
  schema: {
    params: {
      id: { type: 'integer' },
    },
    response: {
      200: User,
    },
  },
  async handler(request, reply)
  {
    const { id } = request.params;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    reply.send(user ?? `No User with id ${id}`);
  },
};

// section Count
export const getCount = {
  schema: {
    response: {
      200: {
        type: 'number',
      },
    },
  },
  async handler(request, reply)
  {
    const users = await this.prisma.user.findMany();
    reply.send(users.length);
  },
};

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

// section Delete a User
export const deleteUser = {
  schema: {
    params: {
      id: { type: 'integer' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  async handler(request, reply)
  {
    const { id } = request.params;

    if (await this.prisma.user.findUnique({ where: { id } }))
    {
      await this.prisma.user.delete({
        where: { id },
      });

      reply.send('Successfully deleted!');
    }

    reply.send('No user with given id.'); await this.prisma.$disconnect();
  },
};

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
