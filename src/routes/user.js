import {
  addUser, deleteUser, getCount, getUser, getUsers, updateUser,
} from '../controllers/users.js';

export default async (fastify, options, done) =>
{
  // section All Users
  fastify.get('/', getUsers);

  // section Single User
  fastify.get('/:id', getUser);

  // section Count
  fastify.get('/count', getCount);

  // section Add
  fastify.post('/add', addUser);

  // section Delete
  fastify.delete('/delete/:id', deleteUser);

  // section Update
  fastify.put('/update/:id', updateUser);

  done();
};

export const autoPrefix = '/users';
