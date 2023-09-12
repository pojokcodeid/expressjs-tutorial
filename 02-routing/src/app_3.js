import express from "express";
const app = express();
const PORT = 3000;

// mendapatkan semua data barang
app
  .route("/barang")
  .get((req, res) => {
    res.send("Ini adalah metod mendapatkan semua barang");
  })
  .post((req, res) => {
    res.send("Ini adalah metod input barang");
  });
// mendapatkan barang dengan id tertentu
app
  .route("/barang/:id")
  .get((req, res) => {
    res.send(`Ini adalah metod mendapatkan barang dengan id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Ini adalah metod mengubah barang dengan id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Ini adalah metod menghapus barang dengan id ${req.params.id}`);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/barang`);
});
