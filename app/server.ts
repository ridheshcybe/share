import express from "express";
import expressWs from 'express-ws';

const app = express();
const expressws = expressWs(app)

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(process.env.PORT, () => {
    console.log(`Live at http://localhost:${process.env.PORT}`)
});