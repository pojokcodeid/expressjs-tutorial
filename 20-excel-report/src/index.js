import express from "express";
const app = express();
const port = 3000;
import routes from "./routes/index.js";
import appMiddleware from "./middleware/index.js";

import path from "path";
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(appMiddleware);
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
