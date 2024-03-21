import Bar from '../common/bar.js';
import Manager from '../common/manager.js';

const Files = {};
const main = document.getElementById("main");
const uri = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}`;
const managedSocket = new Manager(new WebSocket(uri + '/receive'))

async function Update(File) {
    const a = document.createElement("a");
    const h4 = document.createElement("h4");
    const Img = document.createElement("img");
    const div = document.createElement("div");
    a.target = "_blank";
    Img.src = a.href = File.uri;
    a.download = Img.alt = h4.innerText = File.name;
    a.innerText = "Download " + File.name
    div.appendChild(Img);
    div.appendChild(h4);
    div.appendChild(a);
    main.appendChild(div);
}

managedSocket.once("ready", (name) => {
    // Got name
    document.getElementById("displayName").innerText = `You are "${name}"`;
    managedSocket.on("request", function request(ReqUser) {
        //Got request
        main.innerText = `${ReqUser} is requesting....`;

        // confirm with user
        if (!confirm(`Request from User: ${ReqUser}`)) {
            main.innerText = `Waiting for a request...`;
            managedSocket.removeListener("request", request);
            return managedSocket.send("reqstat", "cancel");
        };

        main.innerText = `${ReqUser} is Transferring`;
        // confirm to signaling server
        managedSocket.send("reqstat", "confirm");
        managedSocket.on("open", (id) => {
            managedSocket.on("DOWN-" + id, (data) => {
                if (typeof data === "string") data = JSON.parse(data);
                // check if data is spoiled
                const fileidBool = Reflect.has(data, 'fileid');
                const dataBool = Reflect.has(data, 'data');
                const nameBool = Reflect.has(data, 'name');
                const CCC = Reflect.has(data, 'CurrentChunkCount');
                const TCC = Reflect.has(data, 'TotalChunkCount')
                if (!(fileidBool && dataBool && nameBool && CCC && TCC)) {
                    console.log(fileidBool, dataBool, nameBool, CCC, TCC);
                    return managedSocket.socket.close(3003, "Data dose not have the conventional format");
                };

                // store the file
                if (!Files[data.fileid]) Files[data.fileid] = {
                    uri: "",
                    name: data.name
                }
                if (!Files[data.fileid].name) Files[data.fileid].name = data.name
                if (data.CurrentChunkCount > data.TotalChunkCount) return managedSocket.send("CLOSE-" + id, "0");
                Bar((data.CurrentChunkCount / data.TotalChunkCount) * 100);
                Files[data.fileid].uri += data.data;
            });
            managedSocket.on("CLOSE-" + id, (JUNK) => {
                main.innerText = "";
                for (let i = 0, len = Object.keys(Files).length; i < len; i++) {
                    Update(Object.values(Files)[i]);
                }
            })
            console.files = (Files);
        });
    })

});