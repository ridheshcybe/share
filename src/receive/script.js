import Manager from '../common/manager.js';

const managedSocket = new Manager(new WebSocket('ws://localhost:8080/receive'))

managedSocket.on("ready", (name) => {
    managedSocket.on("request", (ReqUser) => {
        if (!confirm(`Request from User: ${ReqUser}`)) return managedSocket.send("reqstat", "cancel");
        managedSocket.send("reqstat", "confirm");
    })
});