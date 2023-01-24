import path from "path";
import Scetch from 'scetch';
import express from "express";
import expressWs from "express-ws";
import { randomBytes } from "crypto";

const scetch = Scetch();
const combine = expressWs(express());
const app = combine.app;
const port = process.env.PORT || 8080;

app.engine('sce', scetch.engine); // 'sce' registers the file extension, scetch.engine is the actual engine!
app.set('view engine', 'sce');
app.set('views', path.resolve(__dirname, '../web/views'));

app.use((req, res, next) => {
    app.locals.nonce = randomBytes(16).toString("base64url");
    next()
})
app.use('/js', express.static(path.resolve(__dirname, '../web/js')))
app.use('/css', express.static(path.resolve(__dirname, '../web/css')))

app.get('/', (req, res) => {
    res.render("index.sce")
});

app.get('/signin', (req, res) => {
    res.render("signin.sce", {
        nonce: app.locals.nonce
    })
})

app.ws('/signin', (ws, req) => {
    ws.on('message', (msg) => {
        ws.send('')
    })
})

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`)
});