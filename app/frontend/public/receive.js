let id = null;
const socket = io();
const files = []

socket.emit("needname", null);

socket.on("newname", (Nname) => {
    if (typeof Nname !== "string") return socket.emit("error", new Error(`Nname: ${Nname} is not a string`))
    id = Nname;
    document.getElementById("id").textContent = id;
})


socket.on("pair", (deviceID) => {
    if (typeof Nname !== "string") return socket.emit("error", new Error(`deviceID: ${deviceID} is not a string`))
    const bool = confirm(`${deviceID} is trying to send files. do you want to receive them?`)
    if (!bool) return socket.emit("pair disconnect", deviceID);
    socket.emit("pair connect", deviceID)
})

socket.on("transfer", (data) => {
    const json = JSON.parse(data);
    if (!Reflect.has(json, 'type')) return socket.emit("error", new Error(`json.type dosen't exists`));
    if (!Reflect.has(json, 'buffer')) return socket.emit("error", new Error(`json.buffer dosen't exists`));
    if (!Reflect.has(json, 'chunkNum')) return socket.emit("error", new Error(`json.chunkNum dosen't exists`));
    if (!Reflect.has(json, 'senderID')) return socket.emit("error", new Error(`json.senderID dosen't exists`));
    if (!Reflect.has(json, 'totalChunks')) return socket.emit("error", new Error(`json.totalChunks dosen't exists`));
    if (typeof json.type !== "string") return socket.emit("error", new Error(`json.type isn't a string`));
    if (typeof json.buffer !== "string") return socket.emit("error", new Error(`json.buffer isn't a string`));
    if (typeof json.chunkNum !== "number") return socket.emit("error", new Error(`json.chunkNum isn't a number`));
    if (typeof json.senderID !== "string") return socket.emit("error", new Error(`json.senderID isn't a string`));
    if (typeof json.totalChunk !== "number") return socket.emit("error", new Error(`json.totalChunk isn't a number`));
    const { buffer, chunkNum, totalChunk } = json;
    if (chunkNum == totalChunk) return socket.emit("end", senderID)
    const blob = new Blob([Buffer.from(buffer, "base64")], {
        'type': json.type
    })
    const url = URL.createObjectURL(blob)
    console.log(url);
})