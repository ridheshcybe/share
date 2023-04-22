"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./handlers/router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 443;
app.use("/", router_1.default);
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});
