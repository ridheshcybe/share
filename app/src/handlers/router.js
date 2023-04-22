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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const api_1 = __importDefault(require("./api"));
const path = __importStar(require("path"));
const express_1 = __importStar(require("express"));
const router = (0, express_1.default)();
const frontend = path.resolve(__dirname, "../../frontend");
router.set("view engine", "ejs");
router.set("views", path.resolve(frontend, "./views"));
router.engine("ejs", ejs_1.default.__express);
router.use("/api", api_1.default);
router.use("/public", (0, express_1.static)(path.resolve(frontend, "./public")));
router.get("/", (req, res) => {
    res.render("./index.ejs");
});
router.get("/receive", (req, res) => {
    res.render("./receive.ejs");
});
router.get("/send", (req, res) => {
    res.render("./send.ejs");
});
exports.default = router;
