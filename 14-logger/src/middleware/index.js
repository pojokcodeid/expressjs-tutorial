import express from "express";
const appMiddleware = express();

import bodyParser from "body-parser";
import multer from "multer";
const upload = multer();
import cookieParser from "cookie-parser";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import flash from "express-flash";

import path from "path";
import url from "url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

import logProcess from "../logs/log.js";

appMiddleware.use(expressEjsLayouts);
appMiddleware.use(express.static(path.join(__dirname, "../../public")));

appMiddleware.use(bodyParser.json());
appMiddleware.use(bodyParser.urlencoded({ extended: true }));
appMiddleware.use(upload.array());
appMiddleware.use(cookieParser());
appMiddleware.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
appMiddleware.use(flash());
appMiddleware.use(logProcess);

export default appMiddleware;
