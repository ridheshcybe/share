const path = require('path');
const crypto = require('crypto');
const bp = require('body-parser');
const express = require('express');
const { EventEmitter } = require('events');

const app = express();
const Wsapp = require('express-ws')(app);
const viewsdir = path.resolve(__dirname, './views');
const runsecret = () => crypto.randomBytes(1000).toString('base64url')

app.use(bp.json({ "limit": '10mb' }));

let files = [];
let secret = runsecret();
let EE = new EventEmitter();
let inuse = { r: false, s: false };

app.get("/", (req, res) => {
    res.sendFile(path.resolve(viewsdir, './index.html'));
})

app.get("/receiver", (req, res) => {
    if (inuse.r) return res.sendFile(path.resolve(viewsdir, './buzy.html'));
    inuse.r = true;
    res.render('receiver.ejs', {
        files
    });
});

app.get("/sender", (req, res) => {
    if (inuse.s) return res.sendFile(path.resolve(viewsdir, './buzy.html'));
    inuse.s = true;
    res.render("sender.ejs", {
        random: secret
    })
});

app.get("/freeup/sender/:check", (req, res) => {
    if (req.params.check == secret) {
        files = [];
        inuse.s = false;
        if (!inuse.r && !inuse.s) secret = runsecret();
        res.end()
    } else {
        res.status(400).send("ERROR");
    }
});

app.get("/freeup/receiver/:check", (req, res) => {
    if (req.params.check == secret) {
        files = [];
        inuse.r = false;
        if (!inuse.r && !inuse.s) secret = runsecret();
        res.end()
    } else {
        res.status(400).send("ERROR");
    }
});

Wsapp.app.ws('/poll', (ws) => {
    if (inuse.r && inuse.s) {
        ws.send(files);
        EE.on("new", () => {
            if (inuse.r && inuse.s) ws.send(files);
        })
    }
})

app.post("/sender/:check", (req, res) => {
    if (!(req.params.check == secret && inuse.s)) return res.status(400).send('ERROR');
    if (!(req.body instanceof Array) || req.body.length == 0) return res.status(400).send('ERROR Array or length is required');
    files = req.body;
    EE.emit("new");
    res.send("Sucess");
})

app.listen(8080);