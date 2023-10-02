import pdf from "pdf-creator-node";
import fs from "fs";
import barangCollection from "../models/barangModel.js";
import excelJS from "exceljs";

import excelToJson from "convert-excel-to-json";
import multer from "multer";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file-input");
  },
  filename: function (req, file, cb) {
    let fname = file.originalname;
    cb(null, fname);
  },
});

const upload = multer({
  storage: storage,
});

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
        "controllers/reportBarangController.js:showReport - " + error.message
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
        "controllers/reportBarangController.js:generatePdf - " + error.message
      )
    );
  }
};

const generateExcel = async (req, res, next) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("Barang");
  const path = "./file-output";
  const data = await barangCollection.find({});
  worksheet.columns = [
    { header: "No", key: "s_no", width: 5 },
    { header: "Nama Barang", key: "nama_barang", width: 20 },
    { header: "Jumlah", key: "jumlah", width: 10 },
    { header: "Harga Satuan", key: "harga_satuan", width: 10 },
    { header: "Expire Date", key: "expire_date", width: 20 },
  ];
  let counter = 1;
  data.forEach((barang) => {
    barang.s_no = counter;
    worksheet.addRow(barang);
    counter++;
  });
  let list = ["A", "B", "C", "D", "E"];
  for (let i = 0; i <= counter; i++) {
    list.forEach((item) => {
      worksheet.getCell(item + i).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  }
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    const data2 = await workbook.xlsx
      .writeFile(`${path}/Barang.xlsx`)
      .then(() => {
        res.download(`${path}/Barang.xlsx`, "Barang.xlsx", (err) => {
          if (err) {
            console.log(err);
          } else {
            fs.unlinkSync(`${path}/Barang.xlsx`);
          }
        });
      });
  } catch (error) {
    next(
      new Error(
        "controllers/reportBarangController.js:generatePdf - " + error.message
      )
    );
  }
};

const showUpload = (req, res, next) => {
  try {
    const data = {
      title: "Upload Barang",
      layout: "layout/main",
      message: req.flash("message"),
      data: req.flash("data")[0],
    };
    res.render("reportBarang/upload", data);
  } catch (error) {
    next(
      new Error(
        "controllers/reportBarangController.js:showUpload - " + error.message
      )
    );
  }
};

async function importExcelData2MongoDB(filePath) {
  const excelData = await excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // excel sheet name
        name: "barang",
        // header row
        header: {
          rows: 1,
        },
        // mapping columns
        columnToKey: {
          A: "nama_barang",
          B: "jumlah",
          C: "harga_satuan",
          D: "expire_date",
        },
      },
    ],
  });

  const process = await barangCollection.insertMany(excelData.barang);
  if (process) {
    fs.unlinkSync(filePath);
  }
  return process;
}

const uploadExcel = async (req, res, next) => {
  try {
    if (await importExcelData2MongoDB("./file-input/" + req.file.filename)) {
      req.flash("message", [
        "success",
        "Berhasil",
        "Data Berhasil di Iupload !",
      ]);
      res.redirect("/barang");
    }
  } catch (error) {
    next(
      new Error(
        "controllers/reportBarangController.js:uploadExcel - " + error.message
      )
    );
  }
};

export {
  showReport,
  generatePdf,
  generateExcel,
  showUpload,
  upload,
  uploadExcel,
};
