import barangCollection from "../models/barang.js";

const getAllBarang = async (req, res, next) => {
  try {
    const barang = await barangCollection.find({});
    const data = {
      title: "Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: barang,
    };
    res.render("barang/index", data);
  } catch (err) {
    next(err);
  }
};

const insertBarang = async (req, res, next) => {
  try {
    const data = {
      title: "Insert Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("barang/insert", data);
  } catch (err) {
    next(err);
  }
};

const setNewBarang = async (req, res, next) => {
  try {
    const data = {
      nama_barang: req.body.nama_barang,
      jumlah: req.body.jumlah,
      harga_satuan: req.body.harga_satuan,
      expire_date: req.body.kadaluarsa,
    };
    const hasil = await barangCollection.insertMany([data]);
    if (hasil) {
      req.flash("message", [
        "success",
        "Berhasil",
        "Berhasil menambahkan barang baru!",
      ]);
      res.redirect("/barang");
    } else {
      req.flash("message", [
        "error",
        "Gagal",
        "Gagal menambahkan barang baru!",
      ]);
      res.redirect("/barang/insert");
    }
  } catch (err) {
    next(err);
  }
};

export { getAllBarang, insertBarang, setNewBarang };
