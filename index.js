"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var express_ws_1 = __importDefault(require("express-ws"));
var socket_1 = __importDefault(require("./socket"));
var WS_Express = (0, express_ws_1.default)((0, express_1.default)());
var app = WS_Express.app;
var UPUsers = {};
var DOWNUsers = {};
var activeUsers = {};
app.use(express_1.default.static(path_1.default.join(__dirname, './src/build')));
app.ws('/receive', function (ws, req) {
    var Manager = new socket_1.default(ws);
    Manager.on("ready", function (name) {
        DOWNUsers[name] = Manager;
        console.log("NEW USER DOWN => ".concat(name));
    });
});
function datafunnel(data, ws, requestID, receiver) {
    if (typeof data == "string")
        data = JSON.parse(data);
    var fileidBool = Reflect.has(data, 'fileid');
    var dataBool = Reflect.has(data, 'data');
    var nameBool = Reflect.has(data, 'name');
    var CCC = Reflect.has(data, 'CurrentChunkCount');
    var TCC = Reflect.has(data, 'TotalChunkCount');
    if (!(fileidBool && dataBool && nameBool && CCC && TCC)) {
        console.log(fileidBool && dataBool && nameBool && CCC && TCC);
        return ws.socket.close(3003, "Data dose not have the conventional format");
    }
    ;
    receiver.send("DOWN-" + requestID, JSON.stringify(data));
}
app.ws('/send', function (ws, req) {
    var Manager = new socket_1.default(ws);
    Manager.on("ready", function (name) {
        UPUsers[name] = Manager;
        Manager.on("request", function sendrequest(checkName) {
            var sender = Manager;
            var receiver = DOWNUsers[checkName];
            if (!receiver) {
                sender.send('reqstat', "NOEXIST");
                sender.removeListener("request", sendrequest);
                return;
            }
            receiver.send("request", name);
            receiver.on("reqstat", function (stat) {
                switch (stat) {
                    case "cancel":
                        sender.send('reqstat', "cancel");
                        sender.removeListener("request", sendrequest);
                        break;
                    case "confirm":
                        var requestID_1 = crypto.randomUUID();
                        activeUsers[(requestID_1)] = {
                            senderName: name,
                            senderSocket: sender,
                            receiverName: checkName,
                            receiverSocket: receiver
                        };
                        sender.send("reqstat", "confirm");
                        sender.send("open", requestID_1);
                        receiver.send("open", requestID_1);
                        receiver.on("CLOSE-" + requestID_1, function () {
                            sender.send("CLOSE-" + requestID_1, 0);
                            activeUsers[requestID_1] = undefined;
                        });
                        sender.on("CLOSE-" + requestID_1, function () {
                            receiver.send("CLOSE-" + requestID_1, 0);
                            activeUsers[requestID_1] = undefined;
                        });
                        sender.on("OPEN-" + requestID_1, function (data) { return datafunnel(data, sender, requestID_1, receiver); });
                        sender.removeListener("request", sendrequest);
                        break;
                    default:
                        sender.socket.close(3000, "REQSTAT_WRONG_STATUS");
                        break;
                }
            });
        });
    });
});
app.use(function (req, res, next) {
    console.info("User: ".concat(req.ip, " is requesting nonexistent stream"));
    res.status(404).send("Not Found");
});
// ERROR
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(process.env.PORT || 8080);
