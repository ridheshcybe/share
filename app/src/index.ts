import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import router from "./handlers/router";
import sockethandler from "./handlers/socket";

const app = express();
const server = createServer(app);
const inout = new Server(server);
const PORT = process.env.PORT || 443;

app.use("/", router);

sockethandler(inout, server);

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
