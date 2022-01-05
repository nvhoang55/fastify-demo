import todos from "../data.js";

// section Schemas
const Todo = {
    type: "object",
    properties: {
        userId: {type: "string"},
        id: {type: "string"},
        title: {type: "string"},
        completed: {type: "boolean"}
    }
};
const getTodosOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                items: Todo
            }
        }
    }
};

const getTodoOpts = {
    schema: {
        response: {
            200: Todo
        }
    }
};

export default async (fastify, options, done) =>
{
    // section All todos
    fastify.get("/", getTodosOpts, (request, reply) =>
    {
        reply.send(todos);
    });

    // section Single todo
    fastify.get("/:id", getTodoOpts, (request, reply) =>
    {
        const {id} = request.params;
        const todo = todos.find(todo => (todo.id === parseInt(id)));

        reply.send(todo ?? "No todo with id " + id);
    });

    done();
}
