import ejs from "ejs";
import api from "./api";
import * as path from "path";
import exp, { static as stat } from "express";

const router = exp();
const frontend = path.resolve(__dirname, "../../frontend");

router.set("view engine", "ejs");
router.set("views", path.resolve(frontend, "./views"));

router.engine("ejs", ejs.__express);

router.use("/api", api);
router.use("/public", stat(path.resolve(frontend, "./public")));

router.get("/", (req, res) => {
  res.render("./index.ejs");
});

router.get("/receive", (req, res) => {
  res.render("./receive.ejs");
});

router.get("/send", (req, res) => {
  res.render("./send.ejs");
});

export default router;
