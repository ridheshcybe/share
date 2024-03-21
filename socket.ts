import randomname from 'random-name'
import { EventEmitter } from 'events';
import WebSocket from 'ws';

/**
 * 3000 Wrong Protocol
 * 3001 Parsing error
 * 3002 Invalid ID
 * 3003 send Protocol error (invalid properties (different properties))
 */

export class SocketManager extends EventEmitter {
    name: string;
    socket: WebSocket;
    constructor(socket: WebSocket) {
        super();
        const self = this;
        this.name = `${randomname.first()}-${randomname.last()}`.toLowerCase();
        this.socket = socket;

        socket.onerror = (ev) => {
            console.log(`Error Socket: ${(ev.message)}`)
        }

        socket.onclose = (ev) => {
            console.log(`Socket closed: ${ev.reason} | ${ev.code} | ${ev.wasClean}`)
        }

        socket.onmessage = (ev) => {
            if (ev.data !== 'ready') {
                console.warn("ready not fired");
                return socket.close(3000, "use protocol");
            }
            self.send("name", self.name);
            self.emit("ready", self.name);
            socket.onmessage = (ev) => {
                const dataIN = (ev.data).toString()
                if (!dataIN.includes('(SocketSplit)')) {
                    console.warn("CLOSED SOCKET SOCKETSPLIT NOT INCLUDED")
                    return socket.close(3000, "use protocol")
                };
                const [method, data] = dataIN.split('(SocketSplit)');
                if (!method || !data) {
                    console.warn("CLOSED SOCKET METHOD || DATA IS FALSY")
                    return socket.close(3000, 'use protocol');
                }

                try {
                    self.emit(method, (data));
                } catch (error) {
                    console.warn("socket emit error")
                    socket.close(3000, 'use protocol ERROR: ' + error.message);
                }
            }
        }
    }
    send(method: string, data: any) {
        this.socket.send(`${method}(SocketSplit)${(data)}`);
    }
}

export default SocketManager