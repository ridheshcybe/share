"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const random_name_1 = __importDefault(require("random-name"));
const users = [];
function genname() {
    let count = 0;
    function newname() {
        const randomName = random_name_1.default.first();
        if (users.includes(randomName)) {
            count++;
            if (count <= 5)
                return newname();
            return random_name_1.default.last();
        }
        return randomName;
    }
    return newname();
}
function handler(io, server) {
    io.on("connection", (socket) => { });
}
exports.handler = handler;
exports.default = handler;
