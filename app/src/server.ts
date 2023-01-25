import view from './view';
import Fastify from 'fastify';

const fastify = Fastify()

fastify.get('/', async (req, res) => {
    view(res, './index.ejs')
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) return console.error(err), process.exit(1);
    console.log(`Server is now listening on ${address}`)
})