import express from "express";
import {
  getAllBarang,
  insertBarang,
  setNewBarang,
} from "../controllers/barang.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang);
barangRouter.get("/insert", insertBarang);
barangRouter.post("/", setNewBarang);

export default barangRouter;
