import express from "express";
const barangRouter = express.Router();

barangRouter
  .route("/")
  .get((req, res) => {
    res.send("Ini adalah metod GET all barang");
  })
  .post((req, res) => {
    res.send("Ini adalah metod input barang");
  });
barangRouter
  .route("/:id")
  .get((req, res) => {
    res.send(`Ini adalah metod mendapatkan barang dengan id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Ini adalah metod mengubah barang dengan id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Ini adalah metod menghapus barang dengan id ${req.params.id}`);
  });

export default barangRouter;
