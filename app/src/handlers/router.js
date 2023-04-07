"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const frontend = path.resolve(__dirname, "../../frontend");
router.use("/public", (0, express_1.static)(path.resolve(__dirname, "../../frontend/public")));
router.get("/", (req, res) => {
    res.sendFile(path.resolve(frontend, "./index.html"));
});
router.get("/receive", (req, res) => {
    res.sendFile(path.resolve(frontend, "./receive.html"));
});
router.get("/send", (req, res) => {
    res.sendFile(path.resolve(frontend, "./send.html"));
});
exports.default = router;
