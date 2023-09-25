import express from "express";
import {
  getSignup,
  postSignup,
  protectedPage,
  isLoggedIn,
  useProtectedPage,
} from "../controllers/register.js";
import { getLogin, logout, postLogin } from "../controllers/login.js";
import barangRouter from "./barang.js";
const routes = express.Router();

routes.get("/", (req, res) => {
  res.redirect("/protected-page");
});

routes.get("/signup", getSignup);
routes.post("/signup", postSignup);
routes.get("/protected-page", isLoggedIn, protectedPage);

routes.get("/login", getLogin);
routes.post("/login", postLogin);
routes.get("/logout", logout);
routes.use("/barang", isLoggedIn, barangRouter);
routes.use("*", useProtectedPage);

export default routes;
