"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users = [
    {
        name: "Hannah",
    },
];
const router = (0, express_1.Router)();
router.get("/get-users", (req, res) => {
    res.json(users);
});
exports.default = router;
