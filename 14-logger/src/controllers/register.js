import logInCollection from "../models/users.js";
import regValid from "../validation/register.js";
import { compare, encript } from "../utils/bcrypt.js";
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
    title: "Protected Page",
    layout: "layout/main-layout",
    message: "Welcome " + req.session.user.nama,
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
  req.flash("message", ["error", "Error !", err.message]);
  res.redirect("/login");
};

export { getSignup, postSignup, protectedPage, isLoggedIn, useProtectedPage };
