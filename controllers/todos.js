import { v4 as uuid } from 'uuid';
import data from '../data.js';

let todos = data;

const Todo = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    id: { type: 'string' },
    title: { type: 'string' },
    completed: { type: 'boolean' },
  },
};

// section All todos
export const getTodos = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Todo,
      },
    },
  },
  handler: (request, reply) =>
  {
    reply.send(todos);
  },
};

// section Single todo
export const getTodo = {
  schema: {
    response: {
      200: Todo,
    },
  },
  handler: (request, reply) =>
  {
    const { id } = request.params;
    const todo = todos.find((todo) => (todo.id === parseInt(id)));

    reply.send(todo ?? `No todo with id ${id}`);
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
  handler: (request, reply) => reply.send(todos.length),
};

// section Add a todo
export const addTodo = {
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
    },
    response: {
      201: Todo,
    },
  },
  handler: (request, reply) =>
  {
    const { title } = request.body;
    const newTodo = {
      title,
      id: uuid(),
      uid: uuid(),
      completed: false,
    };

    todos.push(newTodo);

    reply.code(201).send(newTodo);
  },
};

// section Delete a todo
export const deleteTodo = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: (request, reply) =>
  {
    const { id } = request.params;

    // return if not found id
    if (!todos.some((todo) => todo.id === parseInt(id)))
    {
      reply.send(`No item with the id #${id}`);
    }

    todos = todos.filter((todo) => todo.id !== parseInt(id));
    reply.send(`Successfully deleted item #${id}`);
  },
};

// section Update a todo
export const updateTodo = {
  schema: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        completed: { type: 'boolean' },
      },
    },
    response: {
      200: Todo,
    },
  },
  handler: (request, reply) =>
  {
    console.log('request.body', request.body);

    const { id } = request.params;
    const { title, completed } = request.body;

    if (!todos.some((todo) => todo.id.toString() === id))
    {
      reply.send(`No item with the id #${id}`);
    }

    todos = todos.map((todo) => (todo.id.toString() === id ? { ...todo, title, completed } : todo));
    reply.send('Successfully updated');
  },
};
