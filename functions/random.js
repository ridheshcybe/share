"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.run = void 0;
var names_json_1 = __importDefault(require("./names.json"));
function run() {
    return names_json_1["default"][Math.floor(Math.random() * names_json_1["default"].length)];
}
exports.run = run;
exports["default"] = run;
