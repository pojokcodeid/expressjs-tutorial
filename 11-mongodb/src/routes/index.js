import express from "express";
import logInCollection from "../models/users.js";
import { compare, encript } from "../utils/bcrypt.js";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.get("/signup", (req, res) => {
  const data = {
    title: "Sign Up",
    layout: "layout/main-layout",
    message: req.flash("message"),
  };
  res.render("signup", data);
});

routes.post("/signup", async (req, res) => {
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400);
    req.flash("message", ["error", "Error !", "Data tidak boleh kosong"]);
    res.redirect("/signup");
  } else {
    const checking = await logInCollection.findOne({ email: req.body.email });
    if (checking) {
      res.status(400);
      req.flash("message", ["error", "Error !", "Email already exists"]);
      res.redirect("/signup");
    } else {
      const newUser = {
        nama: req.body.nama,
        email: req.body.email,
        password: await encript(req.body.password),
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
  };
  res.render("login", data);
});

routes.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    req.flash("message", ["error", "Error !", "Data tidak boleh kosong"]);
    res.redirect("/login");
  } else {
    const checking = await logInCollection.findOne({ email: req.body.email });
    if (checking) {
      if (await compare(req.body.password, checking.password)) {
        req.session.user = {
          nama: checking.nama,
          email: checking.email,
        };
        res.redirect("/protected-page");
      } else {
        res.status(400);
        req.flash("message", ["error", "Error !", "Password salah"]);
        res.redirect("/login");
      }
    } else {
      res.status(400);
      req.flash("message", ["error", "Error !", "Email tidak terdaftar"]);
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
