import express from "express";
const app = express();

app.get("/", (req, res, next) => {
  throw new Error("Ada sebuah error");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Ada sebuah error");
});

app.listen(3000, () => {
  console.log("Server berjalan http://localhost:3000");
});
