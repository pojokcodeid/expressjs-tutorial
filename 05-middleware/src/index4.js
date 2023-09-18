import express from "express";
const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server berjalan http://localhost:3000");
});
