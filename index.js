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
var activeUsers = [];
app.use(express_1.default.static(path_1.default.join(__dirname, './src/build')));
app.ws('/receive', function (ws, req) {
    var Manager = new socket_1.default(ws);
    Manager.on("ready", function (name) {
        DOWNUsers[name] = Manager;
        console.log(name);
    });
});
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
                        var requestID = crypto.randomUUID();
                        activeUsers.push(requestID);
                        sender.send("reqstat", "confirm");
                        sender.removeListener("request", sendrequest);
                        sender.send("open", requestID);
                        break;
                    default:
                        sender.socket.close(3000, "REQSTAT_WRONG_STATUS");
                        break;
                }
            });
        });
    });
});
app.listen(8080);
