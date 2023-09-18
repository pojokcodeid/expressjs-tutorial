import express from "express";
const router = express.Router();
import barangRouter from "./barang.js";

// router.use("/", (req, res) => {
//   const data = {
//     title: "Barang",
//     layout: "layout/main-layout",
//     data: [
//       {
//         id: 100,
//         nama: "Baju",
//       },
//       {
//         id: 200,
//         nama: "Celana",
//       },
//       {
//         id: 300,
//         nama: "Sepatu",
//       },
//     ],
//   };
//   res.render("index", data);
// });

router.use("/barangs", barangRouter);

router.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default router;
