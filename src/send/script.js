import Manager from '../common/manager.js';

let filesArr = [];
const main = document.createElement("main");
const FileInput = document.createElement("input");
const NameInput = document.getElementById("namein");
const SubmitBtn = document.getElementById("submit");
const managedSocket = new Manager(new WebSocket('ws://localhost:8080/send'))

FileInput.type = "file";
FileInput.multiple = true;
FileInput.placeholder = FileInput.ariaLabel = "upload..";
main.appendChild(FileInput);

FileInput.onchange = (evt) => {
    let files = FileInput.files

    for (let file of files) {
        const fileF = new FileReader();
        fileF.onload = (ev) => {
            filesArr.push({
                uri: ev.target.result,
                name: file.name,
                id: crypto.randomUUID()
            })
        }
        fileF.readAsDataURL(file);
    };
}

function chunkString(string) {
    var chunks = [];
    const chunkSize = 256;
    for (var i = 0; i < string.length; i += chunkSize) {
        chunks.push(string.slice(i, i + chunkSize));
    }
    return chunks;
}

managedSocket.on("ready", (name) => {
    SubmitBtn.onclick = () => {
        if (!NameInput.value) return alert("Please enter name");
        if (filesArr.length !== 0) return alert("Please enter files");
        managedSocket.send("request", NameInput.value.toString());
        managedSocket.on("reqstat", function reqstat(status) {
            switch (status) {
                case "cancel":
                    alert("Request Cancelled by " + NameInput);
                    managedSocket.removeListener("reqstat", reqstat);
                    break;
                case "NOEXIST":
                    alert("User does not exist")
                    managedSocket.removeListener("reqstat", reqstat);
                    break;
                case "confirm":
                    managedSocket.removeListener("reqstat", reqstat)
                    break;
            }
        });
        managedSocket.on("open", (requestID) => {
            for (let i = 0; i < filesArr.length; i++) {
                const filesinfo = filesArr[i];

                const id = filesinfo.id;
                const name = filesinfo.name;
                const chunks = chunkString(filesinfo.uri);
                const len = chunks.length;

                for (let i = 0; i < len; i++) {
                    const element = chunks[i];
                    managedSocket.emit("upload", JSON.stringify({
                        requestID,
                        ChunkCount: i,
                        chunk: element,
                        name: name,
                        id,
                        totalCount: len
                    }));
                }
            }
        })
    }
})