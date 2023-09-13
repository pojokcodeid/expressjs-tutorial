import express from "express";
const app = express();
const PORT = 3000;

import router from "./routes/index.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/barangs", (req, res) => {
//   res.send("Ini metode get barang");
// });

// app.post("/barangs", (req, res) => {
//   res.send("Ini metode post barang");
// });

// app.put("/barangs", (req, res) => {
//   res.send("Ini metode put barang");
// });

// app.delete("/barangs", (req, res) => {
//   res.send("Ini metode delete barang");
// });

// app.all("/barangs", (req, res) => {
//   res.send("Ini metode all barang");
// });

// app.get("/random.text", (req, res) => {
//   res.send("Ini metode random text");
// });

// app.get("/ab?cd", (req, res) => {
//   res.send("Ini metode get untuk ad?cd");
// });

// app.get("/ab+cd", (req, res) => {
//   res.send("Ini metode get untuk ab+cd");
// });

// app.get("/ab*cd", (req, res) => {
//   res.send("Ini metode get untuk ab*cd");
// });

// app.get("/ab(cd)?e", (req, res) => {
//   res.send("Ini metode get untuk ab(cd)?e");
// });

// app
//   .route("/barangs")
//   .get((req, res) => {
//     res.send("Ini metode get semua barang");
//   })
//   .post((req, res) => {
//     res.send("Ini metode post barang");
//   });
// app
//   .route("/barangs/:id")
//   .get((req, res) => {
//     res.send("Ini metode get barang dengan id = " + req.params.id);
//   })
//   .put((req, res) => {
//     res.send("Ini metode put barang denan id = " + req.params.id);
//   })
//   .delete((req, res) => {
//     res.send("Ini metode delete barang dengan id  = " + req.params.id);
//   });

// const cb0 = function (req, res, next) {
//   console.log("callback 0");
//   next();
// };

// const cb1 = function (req, res, next) {
//   console.log("callback 2");
//   next();
// };

// const cb2 = function (req, res, next) {
//   console.log("callback 3");
//   next();
// };

// app.get("/example", [cb0, cb1, cb2], (req, res) => {
//   res.send("Ini metode get example");
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}/`);
});
