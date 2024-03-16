import * as FilePond from '../_snowpack/pkg/filepond.js';
import Manager from '../common/manager.js';
import FilePondPluginFileEncode from '../_snowpack/pkg/filepond-plugin-file-encode.js';
import FilePondPluginImagePreview from '../_snowpack/pkg/filepond-plugin-image-preview.js';
import FilePondPluginFileValidateSize from '../_snowpack/pkg/filepond-plugin-file-validate-size.js';
import FilePondPluginFileRename from '../_snowpack/pkg/filepond-plugin-file-rename.js';
import FilePondPluginFileMetadata from '../_snowpack/pkg/filepond-plugin-file-metadata.js';

import '../_snowpack/pkg/filepond/dist/filepond.min.css.proxy.js';
import '../_snowpack/pkg/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css.proxy.js';

const managedSocket = new Manager(new WebSocket('ws://localhost:8080/send'))
const NameInput = document.getElementById("namein");
const SubmitBtn = document.getElementById("submit");

FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginFileRename);
FilePond.registerPlugin(FilePondPluginFileMetadata);
FilePond.registerPlugin(FilePondPluginFileEncode);
FilePond.registerPlugin(FilePondPluginFileValidateSize);
FilePond.create("#drag-drop");

managedSocket.on("ready", (name) => {
    SubmitBtn.onclick = () => {
        if (!NameInput.value) return alert("Please enter name");
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

        })
    }
})