import ejs from "ejs";
import pather from "path";
import { FastifyReply } from "fastify";

const root = pather.resolve(__dirname, '../web/views');

export function render(res: FastifyReply, path: string, data: object = {}) {
    if (!data) data = {};
    path = pather.resolve(root, path);
    ejs.renderFile(path, data, (err, str) => {
        if (err) return res.send(err);
        res.type("text/html")
        res.send(str);
    })
}

export default render