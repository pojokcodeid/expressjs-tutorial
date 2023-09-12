import express from "express";
const app = express();
const PORT = 3000;
import router from "./routes/index.js";

app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/barang`);
});
