import path from 'path';
import express from 'express';
import ExpWS from 'express-ws';
import SocketManager from './socket';

type UsersDB = { [x: string]: SocketManager }
type ActiveUsers = {
    [ID: string]: {
        senderName: string;
        receiverName: string;
        senderSocket: SocketManager;
        receiverSocket: SocketManager;
    }
}
type FileInfo = {
    fileid: string,
    data: string,
    name: string,
    CurrentChunkCount: number,
    TotalChunkCount: number
}

const WS_Express = ExpWS(express());
const app = WS_Express.app;

const UPUsers: UsersDB = {};
const DOWNUsers: UsersDB = {};
const activeUsers: ActiveUsers = {};

app.use(express.static(path.join(__dirname, './src/build')));

app.ws('/receive', (ws, req) => {
    const Manager = new SocketManager(ws);
    Manager.on("ready", (name) => {
        DOWNUsers[name] = Manager;
        console.log(name)
    })
});

function datafunnel(data: FileInfo, ws: SocketManager, requestID: string, receiver: SocketManager) {
    if (typeof data == "string") data = JSON.parse(data);
    const fileidBool = Reflect.has(data, 'fileid');
    const dataBool = Reflect.has(data, 'data');
    const nameBool = Reflect.has(data, 'name');
    const CCC = Reflect.has(data, 'CurrentChunkCount');
    const TCC = Reflect.has(data, 'TotalChunkCount')
    if (!(fileidBool && dataBool && nameBool && CCC && TCC)) {
        console.log(fileidBool && dataBool && nameBool && CCC && TCC);
        return ws.socket.close(3003, "Data dose not have the conventional format");
    };
    receiver.send("DOWN-" + requestID, JSON.stringify(data));
}

app.ws('/send', (ws, req) => {
    let Manager = new SocketManager(ws);
    Manager.on("ready", (name) => {
        UPUsers[name] = Manager;
        Manager.on("request", function sendrequest(checkName) {
            let sender = Manager;
            let receiver = DOWNUsers[checkName];
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
                        activeUsers[(requestID)] = {
                            senderName: name,
                            senderSocket: sender,
                            receiverName: checkName,
                            receiverSocket: receiver
                        }
                        sender.send("reqstat", `confirm`);
                        sender.send("open", requestID);
                        receiver.send("open", requestID);
                        receiver.on("CLOSE-" + requestID, () => {
                            sender.send("CLOSE-" + requestID, 0)
                            activeUsers[requestID] = undefined;
                        });
                        sender.on("CLOSE-" + requestID, () => {
                            receiver.send("CLOSE-" + requestID, 0)
                            activeUsers[requestID] = undefined;
                        })
                        sender.on("OPEN-" + requestID, (data) => datafunnel(data, sender, requestID, receiver));
                        sender.removeListener("request", sendrequest);
                        break;

                    default:
                        sender.socket.close(3000, "REQSTAT_WRONG_STATUS")
                        break;
                }
            })

        });
    });
});

app.listen(8080)