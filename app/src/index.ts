import express from "express";
import router from "./handlers/router";

const app = express();
const PORT = process.env.PORT || 443;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
