import {
  addTodo, deleteTodo, getCount, getTodo, getTodos, updateTodo,
} from '../controllers/todos.js';

export default async (fastify, options, done) =>
{
  // section All todos
  fastify.get('/', getTodos);

  // section Single todo
  fastify.get('/:id', getTodo);

  // section Count
  fastify.get('/count', getCount);

  // section Add
  fastify.post('/add', addTodo);

  // section Delete
  fastify.delete('/delete/:id', deleteTodo);

  // section Delete
  fastify.put('/update/:id', updateTodo);

  done();
};

export const autoPrefix = '/todos';
