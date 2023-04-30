"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const express_1 = require("express");
const router = (0, express_1.Router)();
const views = (0, path_1.resolve)(__dirname, "../../frontend/views");
router.get("/", (req, res) => {
    res.sendFile((0, path_1.resolve)(views, "./index.html"));
});
router.get("/receive", (req, res) => {
    res.sendFile((0, path_1.resolve)(views, "./receive.html"));
});
router.get("/send", (req, res) => {
    res.sendFile((0, path_1.resolve)(views, "./send.html"));
});
exports.default = router;
