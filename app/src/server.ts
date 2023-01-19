import express from "express";
import expressWs from 'express-ws';

const { app } = expressWs(express())
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.render("index.ejs")
});

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

app.listen(port, () => {
    console.log(`Live at http://localhost:${process.env.PORT}`)
});