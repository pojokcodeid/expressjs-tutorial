import logInCollection from "../models/usersModel.js";
import regValid from "../validation/registerValidation.js";
import { compare, encript } from "../utils/bcrypt.js";
import logger from "../logs/winston.js";
const getSignup = (req, res) => {
  const data = {
    title: "Sign Up",
    layout: "layout/main-layout",
    message: req.flash("message"),
    data: req.flash("data")[0],
  };
  res.render("signup", data);
};

const postSignup = async (req, res) => {
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
};

const protectedPage = (req, res, next) => {
  const data = {
    title: "Login",
    layout: "layout/main",
    message: req.flash("message"),
    data: "Welcome " + req.session.user.nama,
  };
  res.render("protected-page", data);
};

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    let err = new Error("Anda belum login !");
    next(err);
  }
}

const useProtectedPage = (err, req, res, next) => {
  let message;
  if (err.message != "Anda belum login !") {
    message = err.message.split(" - ")[1];
    logger.error(err);
  } else {
    message = err.message;
  }
  req.flash("message", ["error", "Error !", message]);
  if (req.session.user) {
    res.redirect("/protected-page");
  } else {
    res.redirect("/login");
  }
};

export { getSignup, postSignup, protectedPage, isLoggedIn, useProtectedPage };
