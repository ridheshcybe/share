import animate from '../common/bar.js';
import Manager from '../common/manager.js';

let TotalChunkCount = 0;
let chunkedFilesArr = [];
const FileInput = document.getElementById("file");
const NameInput = document.getElementById("name");
const SubmitBtn = document.getElementById("submit");
const fileinputdiv = document.querySelector(".file-input");
const uri = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}`;
const managedSocket = new Manager(new WebSocket(uri + '/send'))

fileinputdiv.onclick = () => {
    FileInput.click();
}

FileInput.onchange = () => {
    let files = FileInput.files

    for (let file of files) {
        const fileF = new FileReader();
        fileF.onload = (ev) => {
            const id = (
                [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
                    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            const chunked = chunkString(ev.target.result);
            for (let j = 0, len = chunked.length; j < len; j++) {
                chunkedFilesArr.push({
                    FileID: id,
                    data: chunked[j],
                    name: file.name,
                    TotalChunkCount: len,
                    CurrentChunkCount: j
                })
                TotalChunkCount++;
            }
            console.log(chunkedFilesArr, TotalChunkCount)

        }
        fileF.readAsDataURL(file);
    };

}

function chunkString(string) {
    const chunks = [];
    const chunkSize = 10240 // 10kb;
    for (let i = 0, len = string.length; i < len; i += chunkSize)
        chunks.push(string.slice(i, i + chunkSize));
    return chunks;
}

managedSocket.on("ready", (name) => {
    document.getElementById("displayName").innerText = `You are sending as "${name}"`;
    SubmitBtn.onclick = () => {
        if (!NameInput.value) return alert("Please enter name");
        if (chunkedFilesArr.length == 0) return alert("Please enter files");
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
    };
    managedSocket.on("open", async (requestID) => {
        for (let i = 0, len = chunkedFilesArr.length; i < len; i++) {
            const { FileID, data, name, CurrentChunkCount, TotalChunkCount } = chunkedFilesArr[i];
            const dat = JSON.stringify({
                fileid: FileID,
                data,
                name,
                CurrentChunkCount,
                TotalChunkCount
            });
            managedSocket.send("OPEN-" + requestID, dat);
            animate((i / len) * 100)
        }
        managedSocket.send("CLOSE-" + requestID, 0);
    })
})