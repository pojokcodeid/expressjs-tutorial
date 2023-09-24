import express from "express";
import logInCollection from "../models/users.js";
import { compare, encript } from "../utils/bcrypt.js";
import regValid from "../validation/register.js";
import loginValid from "../validation/login.js";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.get("/signup", (req, res) => {
  const data = {
    title: "Sign Up",
    layout: "layout/main-layout",
    message: req.flash("message"),
    data: req.flash("data")[0],
  };
  console.log(data);
  res.render("signup", data);
});

routes.post("/signup", async (req, res) => {
  const hasil = await regValid(req.body);
  if (hasil.messsage.length > 0) {
    res.status(400);
    req.flash("message", ["error", "Error !", hasil.messsage[0]]);
    req.flash("data", hasil.data);
    res.redirect("/signup");
  } else {
    const checking = await logInCollection.findOne({ email: hasil.data.email });
    if (checking) {
      res.status(400);
      req.flash("message", ["error", "Error !", "Email already exists"]);
      req.flash("data", hasil.data);
      res.redirect("/signup");
    } else {
      const newUser = {
        nama: hasil.data.nama,
        email: hasil.data.email,
        password: await encript(hasil.data.password),
      };
      await logInCollection.insertMany([newUser]);
      req.session.user = {
        nama: newUser.nama,
        email: newUser.email,
      };
      res.redirect("/protected-page");
    }
  }
});

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    let err = new Error("Anda belum login !");
    next(err);
  }
}

routes.get("/protected-page", isLoggedIn, (req, res, next) => {
  const data = {
    title: "Protected Page",
    layout: "layout/main-layout",
    message: "Welcome " + req.session.user.nama,
  };
  res.render("protected-page", data);
});

routes.get("/login", (req, res) => {
  const data = {
    title: "Login",
    layout: "layout/main-layout",
    message: req.flash("message"),
    data: req.flash("data")[0],
  };
  res.render("login", data);
});

routes.post("/login", async (req, res) => {
  const hasil = await loginValid(req.body);
  if (hasil.messsage.length > 0) {
    res.status(400);
    req.flash("message", ["error", "Error !", hasil.messsage[0]]);
    req.flash("data", hasil.data);
    res.redirect("/login");
  } else {
    const checking = await logInCollection.findOne({ email: hasil.data.email });
    if (checking) {
      if (await compare(hasil.data.password, checking.password)) {
        req.session.user = {
          nama: checking.nama,
          email: checking.email,
        };
        res.redirect("/protected-page");
      } else {
        res.status(400);
        req.flash("message", ["error", "Error !", "Password salah"]);
        req.flash("data", hasil.data);
        res.redirect("/login");
      }
    } else {
      res.status(400);
      req.flash("message", ["error", "Error !", "Email tidak terdaftar"]);
      req.flash("data", hasil.data);
      res.redirect("/login");
    }
  }
});

routes.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

routes.use("/protected-page", (err, req, res, next) => {
  req.flash("message", ["error", "Error !", err.message]);
  res.redirect("/login");
});

export default routes;
