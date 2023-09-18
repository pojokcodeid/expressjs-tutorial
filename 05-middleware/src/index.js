import express from "express";

const app = express();
// middleware untuk mencetak log
app.use((req, res, next) => {
  console.log("Contoh log ...");
  next();
});

// middleware untuk menampilkan waktu permintaan
app.use((req, res, next) => {
  req.requestTime = new Date();
  next();
});

app.get("/", (req, res) => {
  let responText = "Hello World <br>";
  responText += `Waktu permintaan: ${req.requestTime}`;
  res.send(responText);
});

app.listen(3000, () => {
  console.log("Server berjalan http://localhost:3000");
});
