import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/barangs", (req, res) => {
  res.send("Ini metode get barang");
});

app.post("/barangs", (req, res) => {
  res.send("Ini metode post barang");
});

app.put("/barangs", (req, res) => {
  res.send("Ini metode put barang");
});

app.delete("/barangs", (req, res) => {
  res.send("Ini metode delete barang");
});

app.all("/barangs", (req, res) => {
  res.send("Ini metode all barang");
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/`);
});
