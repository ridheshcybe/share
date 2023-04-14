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
    socket.on("init", (device) => {});
  });
}
export default handler;
