import express from "express";
const app = express();
const PORT = 3000;

// mendapatkan semua data barang
app.get("/barang", (req, res) => {
  res.send("Ini adalah metod mendapatkan semua barang");
});
// mendapatkan barang dengan id tertentu
app.get("/barang/:id", (req, res) => {
  res.send(`Ini adalah metod mendapatkan barang dengan id ${req.params.id}`);
});
// input barang
app.post("/barang", (req, res) => {
  res.send("Ini adalah metod input barang");
});
// ubah barang dengan id tertentu
app.put("/barang/:id", (req, res) => {
  res.send(`Ini adalah metod mengubah barang dengan id ${req.params.id}`);
});
// hapus barang dengan id tertentu
app.delete("/barang/:id", (req, res) => {
  res.send(`Ini adalah metod menghapus barang dengan id ${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/barang`);
});
