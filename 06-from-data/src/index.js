import express from "express";
const app = express();
const PORT = 3000;

import router from "./routes/index.js";

import ejs from "ejs";

import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/`);
});
