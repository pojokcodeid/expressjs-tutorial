import express from "express";
const router = express.Router();
import barangRouter from "./barang.js";

router.use("/barang", barangRouter);
router.use("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

export default router;
