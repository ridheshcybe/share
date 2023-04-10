import random from "random-name";
import { Server as httpS } from "http";
import { Server as socketS } from "socket.io";

const users = [];

function genname() {
  let count = 0;
  function newname() {
    const randomName = random.first();
    if (users.includes(randomName)) {
      count++;
      if (count <= 5) return newname();
      return random.last();
    }
    return randomName;
  }
  return newname();
}

export function handler(io: socketS, server: httpS) {
  io.on("connection", (socket) => {
    console.log("new connection");
    socket.on("needname", () => {
      socket.emit("newname", genname());
    });
    socket.emit("pair", "ridhesh");
    socket.on("pair disconnect", (id) => {
      console.log(`disconnect on ${id}`);
    });
    socket.on("pair connect", (id) => {
      console.log(`connect on ${id}`);
      socket.emit(
        "transfer",
        JSON.stringify({
          chunkNum: 0,
          totalChunks: 0,
          senderID: "BOT",
          type: "appliction/json",
          buffer: JSON.stringify({ data: { name: "hello" } }),
        })
      );
    });
    socket.on("end", (id) => console.log(`end on ${id}`));
    socket.on("error", (err) => console.error(err));
  });
}
export default handler;
