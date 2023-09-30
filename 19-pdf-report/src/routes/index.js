import express from "express";
import {
  getSignup,
  postSignup,
  protectedPage,
  isLoggedIn,
  useProtectedPage,
} from "../controllers/registerController.js";
import { getLogin, logout, postLogin } from "../controllers/loginController.js";
import barangRouter from "./barangRoute.js";
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
