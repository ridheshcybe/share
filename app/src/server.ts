import path from "path"
import express from "express";
import expressWs from "express-ws";

const { app } = expressWs(express())
const port = process.env.PORT || 8080

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../web/views'));

app.use('/css', express.static(path.resolve(__dirname, '../web/css')))

app.get('/', (req, res) => {
    res.render("index.ejs")
});

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`)
});