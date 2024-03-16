import path from 'path';
import express from 'express';
import ExpWS from 'express-ws';
import SocketManager from './socket';

type UsersDB = { [x: string]: SocketManager }
type ActiveUsers = string[];
type FileInfo = {
    Uint8Array: Uint8Array;
    CurrentChunkCount: number;
}

const WS_Express = ExpWS(express());
const app = WS_Express.app;

const UPUsers: UsersDB = {};
const DOWNUsers: UsersDB = {};
const activeUsers: ActiveUsers = [];

app.use(express.static(path.join(__dirname, './src/build')));

app.ws('/receive', (ws, req) => {
    const Manager = new SocketManager(ws);
    Manager.on("ready", (name) => {
        DOWNUsers[name] = Manager;
        console.log(name)
    })
});

app.ws('/send', (ws, req) => {
    const Manager = new SocketManager(ws);
    Manager.on("ready", (name) => {
        UPUsers[name] = Manager;
        Manager.on("request", function sendrequest(checkName) {
            const sender = Manager;
            const receiver = DOWNUsers[checkName];
            if (!receiver) {
                sender.send('reqstat', "NOEXIST");
                sender.removeListener("request", sendrequest);
                return;
            }
            receiver.send("request", name);
            receiver.on("reqstat", (stat) => {
                switch (stat) {
                    case "cancel":
                        sender.send('reqstat', "cancel");
                        sender.removeListener("request", sendrequest);
                        break;

                    case "confirm":
                        const requestID = crypto.randomUUID();
                        activeUsers.push(requestID)
                        sender.send("reqstat", `confirm`);
                        sender.removeListener("request", sendrequest);
                        sender.send("open", requestID);
                        break;

                    default:
                        sender.socket.close(3000, "REQSTAT_WRONG_STATUS")
                        break;
                }
            })
        })
    })
});

app.listen(8080)