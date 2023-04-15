"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const router_1 = __importDefault(require("./handlers/router"));
const socket_1 = __importDefault(require("./handlers/socket"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const inout = new socket_io_1.Server(server);
const PORT = process.env.PORT || 443;
app.use("/", router_1.default);
(0, socket_1.default)(inout, server);
server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
