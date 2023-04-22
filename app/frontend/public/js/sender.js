import byteFromatter from './modules/byteformatter.js';
import compressArrayBuffer from './modules/compress.js';

const users = []
const result = document.getElementById("result");

fetch('/api/get-users').then(e => e.json()).then(e => {
    if (e.length === 0) result.innerHTML = `<p class="text-center text-white mx-auto h-full">No users trying receiveing, Try again later</p>`;
    console.log(e.length)
})

let Loadedfiles = []
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

function removeMultiUpload() {
    Loadedfiles = [];
    multiUploadInput.value = '';
    multiUploadDisplayText.innerHTML = '';
    multiUploadDeleteButton.classList.add("hidden");
    multiUploadDeleteButton.classList.remove("z-100", "p-2", "my-auto");
}