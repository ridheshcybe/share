import * as path from "path";
import { Router, static as stat } from "express";

const router = Router();
const frontend = path.resolve(__dirname, "../../frontend");

router.use("/public", stat(path.resolve(__dirname, "../../frontend/public")));

router.get("/", (req, res) => {
  res.sendFile(path.resolve(frontend, "./index.html"));
});

router.get("/receive", (req, res) => {
  res.sendFile(path.resolve(frontend, "./receive.html"));
});

router.get("/send", (req, res) => {
  res.sendFile(path.resolve(frontend, "./send.html"));
});

export default router;
