import Fastify from "fastify";

const fastify = Fastify({
    logger: true
});
const PORT = 5000;

// section Routes
fastify.get("/", (request, reply) =>
{
    reply.send("Hello World");
});

// section Start server
const start = async () =>
{
    try
    {
        await fastify.listen(PORT);
    }
    catch (err)
    {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
