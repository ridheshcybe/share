import byteFromatter from './modules/byteformatter.js';
import compressArrayBuffer from './modules/compress.js';
import socketio from "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.1/socket.io.esm.min.js"

let Loadedfiles = []
const socket = socketio.io();
const multiUploadButton = document.getElementById("multi-upload-button");
const multiUploadInput = document.getElementById("multi-upload-input");
const multiUploadDisplayText = document.getElementById("multi-upload-text");
const multiUploadDeleteButton = document.getElementById("multi-upload-delete");

multiUploadButton.onclick = () => multiUploadInput.click();

multiUploadInput.addEventListener('change', (event) => {
    if (multiUploadInput.files) {
        let files = multiUploadInput.files;

        multiUploadDisplayText.innerHTML = files.length + ' files selected';
        multiUploadDeleteButton.classList.add("z-100", "p-2", "my-auto");
        multiUploadDeleteButton.classList.remove("hidden");


        Object.keys(multiUploadInput.files).forEach(e => {
            let file = multiUploadInput.files[e];
            //more than 1 TB
            if (bsize > 1024 * 1024 * 1024 * 1024) return alert(`File size too large: ${file.name}`)

            const bsize = byteFromatter(file.size)

            let submit = {
                lastModified: file.lastModified,
                name: file.name,
                size: bsize,
                type: file.type
            }

            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const arrayBuffer = reader.result;
                compressArrayBuffer(arrayBuffer).then(e => {
                    submit.buffer = e
                    Loadedfiles.push(submit)
                }).catch(err => console.error(`Error compressing ${e.message}`))
            }
            reader.onerror = (ev) => {
                alert(`Error reading: ${ev.message}`);
            }
        });
    } else {
        Loadedfiles = [];
    }
});

document.getElementById("send").onclick = () => {

}

function removeMultiUpload() {
    Loadedfiles = [];
    multiUploadInput.value = '';
    multiUploadDisplayText.innerHTML = '';
    multiUploadDeleteButton.classList.add("hidden");
    multiUploadDeleteButton.classList.remove("z-100", "p-2", "my-auto");
}