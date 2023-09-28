import express from "express";
import {
  getAllBarang,
  insertBarang,
  setNewBarang,
  editBarang,
  setEditBarang,
} from "../controllers/barangController.js";
const barangRouter = express.Router();

barangRouter.get("/", getAllBarang);
barangRouter.get("/insert", insertBarang);
barangRouter.post("/", setNewBarang);
barangRouter.get("/:id", editBarang);
barangRouter.post("/:id", setEditBarang);

export default barangRouter;
