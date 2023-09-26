import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import barangCollection from "../models/barang.js";
import barangValid from "../validation/barang.js";

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
    const out = barangValid(req.body);
    if (out.message.length > 0) {
      req.flash("message", ["error", "Gagal", out.message[0]]);
      req.flash("data", out.data);
      res.redirect("/barang/insert");
    } else {
      const hasil = await barangCollection.insertMany([out.data]);
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
    }
  } catch (err) {
    next(err);
  }
};

const editBarang = async (req, res, next) => {
  try {
    const { id } = req.params;
    let barang = await barangCollection.findOne({ _id: new ObjectId(id) });
    const editData = req.flash("data")[0];
    if (editData) {
      barang = editData;
    }
    const data = {
      title: "Edit Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: barang,
    };
    res.render("barang/edit", data);
  } catch (err) {
    next(err);
  }
};

const setEditBarang = async (req, res, next) => {
  try {
    const { id, mode } = req.body;
    const out = barangValid(req.body);
    const outerror = [{ _id: new ObjectId(id), ...out.data }];
    if (out.message.length > 0) {
      req.flash("message", ["error", "Gagal", out.message[0]]);
      req.flash("data", outerror);
      res.redirect(`/barang/${id}`);
    } else {
      if (mode == "update") {
        const hasil = await barangCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: out.data }
        );
        if (hasil) {
          req.flash("message", [
            "success",
            "Berhasil",
            "Berhasil mengubah barang!",
          ]);
          res.redirect("/barang");
        } else {
          req.flash("message", ["error", "Gagal", "Gagal mengubah barang!"]);
          res.redirect(`/barang/${id}`);
        }
      } else {
        const hasil = await barangCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (hasil) {
          req.flash("message", [
            "success",
            "Berhasil",
            "Berhasil menghapus barang!",
          ]);
          res.redirect("/barang");
        } else {
          req.flash("message", ["error", "Gagal", "Gagal menghapus barang!"]);
          res.redirect(`/barang/${id}`);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

export { getAllBarang, insertBarang, setNewBarang, editBarang, setEditBarang };
