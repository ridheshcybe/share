"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
var random_name_1 = __importDefault(require("random-name"));
var events_1 = require("events");
/**
 * 3000 Wrong Protocol
 * 3001 Parsing error
 * 3002 Invalid ID
 */
var SocketManager = /** @class */ (function (_super) {
    __extends(SocketManager, _super);
    function SocketManager(socket) {
        var _this = _super.call(this) || this;
        var self = _this;
        _this.name = "".concat(random_name_1.default.first(), "-").concat(random_name_1.default.last()).toLowerCase();
        _this.socket = socket;
        socket.onerror = function (ev) {
            console.log("Error Socket: ".concat(JSON.stringify(ev)));
        };
        socket.onclose = function (ev) {
            console.log("Socket closed: ".concat(JSON.stringify(ev)));
        };
        socket.onmessage = function (ev) {
            if (ev.data !== 'ready')
                return socket.close(3000, "use protocol");
            self.send("name", self.name);
            self.emit("ready", self.name);
            socket.onmessage = function (ev) {
                var dataIN = (ev.data).toString();
                if (!dataIN.includes('(SocketSplit)')) {
                    return socket.close(3000, "use protocol");
                }
                ;
                var _a = dataIN.split('(SocketSplit)'), method = _a[0], data = _a[1];
                if (!method || !data)
                    return socket.close(3000, 'use protocol');
                try {
                    self.emit(method, (data));
                }
                catch (error) {
                    socket.close(3000, 'use protocol ERROR: ' + error.message);
                }
            };
        };
        return _this;
    }
    SocketManager.prototype.send = function (method, data) {
        this.socket.send("".concat(method, "(SocketSplit)").concat((data)));
    };
    return SocketManager;
}(events_1.EventEmitter));
exports.SocketManager = SocketManager;
exports.default = SocketManager;
