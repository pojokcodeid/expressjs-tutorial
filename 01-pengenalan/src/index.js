import express from "express";
const app = express();
const port = 3000;
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: "Pojok Code",
  //   umur: 20,
  // });
  // console.log(__dirname);
  res.sendFile("./page/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  // res.send("About Page");
  res.sendFile("./page/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  // res.send("Contact Page");
  res.sendFile("./page/contact.html", { root: __dirname });
});

app.get("/barang/:id", (req, res) => {
  const id = req.params.id;
  const name = req.query.kategori;
  res.send("Ini halaman barang dengan id " + id + "<br> dan kategori " + name);
});

app.use("*", (req, res) => {
  res.status(404);
  // res.send("Halaman tidak ditemukan");
  res.sendFile("./page/404.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
