import {addTodo, getCount, getTodo, getTodos} from "../controllers/todos.js";

export default async (fastify, options, done) =>
{
    // section All todos
    fastify.get("/", getTodos);

    // section Single todo
    fastify.get("/:id", getTodo);

    // section Count
    fastify.get("/count", getCount);

    // section Add
    fastify.post("/add", addTodo);

    done();
}
