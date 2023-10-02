import express from "express";
import {
  getAllBarang,
  insertBarang,
  setNewBarang,
  editBarang,
  setEditBarang,
} from "../controllers/barangController.js";
import {
  showReport,
  generatePdf,
  generateExcel,
  showUpload,
  upload,
  uploadExcel,
} from "../controllers/reportBarangController.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang);
barangRouter.get("/insert", insertBarang);
barangRouter.get("/report", showReport);
barangRouter.get("/upload", showUpload);
barangRouter.post("/excel", generateExcel);
barangRouter.post("/", setNewBarang);
barangRouter.post("/report", generatePdf);
barangRouter.post("/upload", upload.single("uploadfile"), uploadExcel);
barangRouter.get("/:id", editBarang);
barangRouter.post("/:id", setEditBarang);

export default barangRouter;
