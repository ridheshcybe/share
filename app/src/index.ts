import express from "express";
import router from "./handlers/router";
import { resolve } from "path";
import api from "./handlers/api";

// will update to python because it is faster

const app = express();
const PORT = process.env.PORT || 443;
const frontend = resolve(__dirname, "../frontend");

app.set("views", resolve(frontend, "./views"));

app.use("/public", express.static(resolve(frontend, "./public")));
app.use("/api", api);
app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
