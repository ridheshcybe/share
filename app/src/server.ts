import path from 'path';
import view from './view';
import Fastify from 'fastify';

const fastify = Fastify()

fastify.register(require('@fastify/static'), {
    root: path.resolve(__dirname, '../web/css'),
    prefix: '/css/',
})

fastify.get('/', (req, res) => {
    view(res, './index.ejs')
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) return console.error(err), process.exit(1);
    console.log(`Server is now listening on ${address}`)
})