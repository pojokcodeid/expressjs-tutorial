import express from "express";
const routes = express.Router();
let Users = [];

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

routes.post("/signup", (req, res) => {
  if (!req.body.nama || !req.body.email || !req.body.password) {
    res.status(400);
    req.flash("message", ["error", "Error !", "Data tidak boleh kosong"]);
    res.redirect("/signup");
  } else {
    Users.filter((user) => {
      if (user.email === req.body.email) {
        res.status(400);
        req.flash("message", ["error", "Error !", "Email already exists"]);
        res.redirect("/signup");
      }
    });
    const newUser = {
      nama: req.body.nama,
      email: req.body.email,
      password: req.body.password,
    };
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect("/protected-page");
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

routes.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    req.flash("message", ["error", "Error !", "Data tidak boleh kosong"]);
    res.redirect("/login");
  } else {
    if (Users.length === 0) {
      res.redirect("/signup");
    } else {
      Users.filter((user) => {
        if (
          user.email === req.body.email &&
          user.password === req.body.password
        ) {
          req.session.user = user;
          res.redirect("/protected-page");
        } else {
          res.status(400);
          req.flash("message", ["error", "Error !", "Email tidak terdaftar"]);
          res.redirect("/login");
        }
      });
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
