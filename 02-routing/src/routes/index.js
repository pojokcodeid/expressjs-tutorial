import express from "express";
const router = express.Router();
import barangRouter from "./barang.js";

router.use("/barangs", barangRouter);

router.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default router;
