import todos from "../data.js";
import {v4 as uuid} from "uuid";

const Todo = {
    type: "object",
    properties: {
        userId: {type: "string"},
        id: {type: "string"},
        title: {type: "string"},
        completed: {type: "boolean"}
    }
};

// section All todos
export const getTodos = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Todo
            }
        }
    },
    handler: (request, reply) =>
    {
        reply.send(todos);
    }
};

// section Single todo
export const getTodo =
    {
        schema: {
            response: {
                200: Todo
            }
        },
        handler: (request, reply) =>
        {
            const {id} = request.params;
            const todo = todos.find(todo => (todo.id === parseInt(id)));

            reply.send(todo ?? "No todo with id " + id);
        }
    };

// section Count
export const getCount =
    {
        schema: {
            response: {
                200: {
                    type: "number"
                }
            }
        },
        handler: (request, reply) => reply.send(todos.length)
    };

// section Add a todo
export const addTodo = {
    schema: {
        body: {
            type: "object",
            required: ["title"],
            properties: {
                title: {type: "string"}
            }
        },
        response: {
            201: Todo
        }
    },
    handler: (request, reply) =>
    {
        const {title} = request.body;
        const newTodo = {
            title,
            id: uuid(),
            uid: uuid(),
            completed: false
        };

        todos.push(newTodo);

        reply.code(201).send(newTodo);
    }
};
