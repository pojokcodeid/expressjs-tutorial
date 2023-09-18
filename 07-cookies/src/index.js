import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "name=Pojok Code");
  res.cookie("name", "Pojok Code", {
    // maxAge: 5000,
    // expires: new Date(Date.now() + 5000),
    httpOnly: true,
    secure: true,
    domain: "localhost",
  });
  res.send("Cookies are set!");
});

app.get("/get-cookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/delete-cookies", (req, res) => {
  res.clearCookie("name");
  res.send("Cookies are deleted!");
});

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
