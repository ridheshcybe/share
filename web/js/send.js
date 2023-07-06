import { io } from "https://cdn.socket.io/4.7.1/socket.io.esm.min.js";

let gname;
const name = document.getElementById("name");
const select = document.getElementById("options");
const socket = io();

function refresh(users) {
    function createopt(name) {
        const opt = document.createElement("option");
        opt.innerText = opt.value = name;
        select.appendChild(opt);
    }
    select.innerHTML = ''
    users.forEach(name => createopt(name));
}

socket.on("state reason", (cb) => cb('SEND'));
socket.on("NAME", (n) => name.innerText = gname = n);

socket.on("addusers", (users) => refresh(users));
socket.on("deleteusers", (users) => refresh(users));

socket.on("ERROR", (err) => {
    alert('Errot found check logs');
    console.error(err);
});