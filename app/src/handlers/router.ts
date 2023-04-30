import { resolve } from "path";
import { Router } from "express";

const router = Router();
const views = resolve(__dirname, "../../frontend/views");

router.get("/", (req, res) => {
  res.sendFile(resolve(views, "./index.html"));
});

router.get("/receive", (req, res) => {
  res.sendFile(resolve(views, "./receive.html"));
});

router.get("/send", (req, res) => {
  res.sendFile(resolve(views, "./send.html"));
});

export default router;
