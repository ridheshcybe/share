import Fastify from 'fastify';

const fastify = Fastify({
    logger: process.env.enviroment !== "production"
})

fastify.get('/', (req, res) => {
    res.send('Hi')
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) return fastify.log.error(err), process.exit(1);
    console.log(`Server is now listening on ${address}`);
})