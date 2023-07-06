import http from "http";
import path from "path";
import express from "express";
import { Server, Socket } from "socket.io";
import randomname from "./functions/random";

const users = {
  senders: [],
  recievers: [],
};

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);
const viewdir = path.resolve(__dirname, "./web");

app.use("/js", express.static(path.resolve(viewdir, "./js")));
app.use("/css", express.static(path.resolve(viewdir, "./css")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(viewdir, "index.html"));
});

app.get("/receive", (req, res) => {
  res.sendFile(path.resolve(viewdir, "receive.html"));
});

app.get("/send", (req, res) => {
  res.sendFile(path.resolve(viewdir, "send.html"));
});

function send(socket: Socket) {
  const ip = socket.handshake.address;
  const check = users.senders.filter((u) => u.ip === ip);
  let name = randomname();
  if (check.length == 0) {
    users.senders.push({ name, socket, ip });
    console.log(`New user: ${ip} assigned name ${name}`);
  } else name = check[0].name;
  socket.emit("NAME", name);

  socket.emit("addusers", users.recievers);
}

function receive(socket: Socket) {}

io.on("connection", async (socket) => {
  try {
    const response = await socket.timeout(1000).emitWithAck("state reason");
    if (response === "SEND") return send(socket);
    return receive(socket);
  } catch (err) {
    console.log(`disconnect ${err}`);
    socket.disconnect();
  }
});

httpServer.listen(8080);
