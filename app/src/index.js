"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./handlers/router"));
const path_1 = require("path");
const api_1 = __importDefault(require("./handlers/api"));
// will update to python because it is faster
const app = (0, express_1.default)();
const PORT = process.env.PORT || 443;
const frontend = (0, path_1.resolve)(__dirname, "../frontend");
app.set("views", (0, path_1.resolve)(frontend, "./views"));
app.use("/public", express_1.default.static((0, path_1.resolve)(frontend, "./public")));
app.use("/api", api_1.default);
app.use("/", router_1.default);
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
