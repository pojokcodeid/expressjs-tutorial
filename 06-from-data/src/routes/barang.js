import express from "express";
const barangRouter = express.Router();

import multer from "multer";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
});

barangRouter
  .route("/")
  .get((req, res) => {
    res.send("Ini metode get semua barang");
  })
  .post(upload.single("attacment"), (req, res) => {
    let file = req.file;
    let body = req.body;
    console.log(file);
    console.log(body);
    res.send("Ini metode post barang");
  });
barangRouter.route("/insert").get((req, res) => {
  const data = {
    title: "Barang",
    layout: "layout/main-layout",
  };
  res.render("barang/index", data);
});
barangRouter
  .route("/:id")
  .get((req, res) => {
    res.send("Ini metode get barang dengan id = " + req.params.id);
  })
  .put((req, res) => {
    res.send("Ini metode put barang denan id = " + req.params.id);
  })
  .delete((req, res) => {
    res.send("Ini metode delete barang dengan id  = " + req.params.id);
  });

export default barangRouter;
