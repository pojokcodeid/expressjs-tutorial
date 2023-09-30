import pdf from "pdf-creator-node";
import fs from "fs";
import barangCollection from "../models/barangModel.js";

const showReport = (req, res, next) => {
  try {
    const data = {
      title: "Report Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("reportBarang/index", data);
  } catch (error) {
    next(
      new Error(
        "controllers/reportBarangController.js:showReport - " + err.message
      )
    );
  }
};

const generatePdf = async (req, res, next) => {
  try {
    let pathFile = "./file-output";
    let fileName = "output.pdf";
    let fullPath = pathFile + "/" + fileName;
    let html = fs.readFileSync("./src/templates/template.html", "utf-8");
    let options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "5mm",
        contents: '<div style="text-align: center;">Author: Pojok Code</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };
    const data = await barangCollection.find({});
    let barangs = [];
    data.forEach((barang, no) => {
      barangs.push({
        no: no + 1,
        id: barang._id,
        nama_barang: barang.nama_barang,
        jumlah: barang.jumlah.toLocaleString("id"),
        harga_satuan: barang.harga_satuan.toLocaleString("id"),
        expire_date: barang.expire_date
          ? new Date(barang.expire_date).toISOString().slice(0, 10)
          : "",
      });
    });
    let document = {
      html: html,
      data: {
        barangs: barangs,
      },
      path: fullPath,
      type: "",
    };
    const process = await pdf.create(document, options);
    if (process) {
      res.download(fullPath, fileName, (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.unlinkSync(fullPath);
        }
      });
    }
  } catch (error) {
    next(
      new Error(
        "controllers/reportBarangController.js:generatePdf - " + err.message
      )
    );
  }
};

export { showReport, generatePdf };
