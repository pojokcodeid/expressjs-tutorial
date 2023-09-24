import winston from "winston";
import "winston-daily-rotate-file";
import "winston-mongodb";
import TransportStream from "winston-transport";

import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/latihan";
const clinet = new MongoClient(url);
await clinet.connect();

class MyClass extends TransportStream {
  constructor(options) {
    super(options);
  }

  log(info, next) {
    // custom disini sesuai kebutuhan email,WA, .....
    console.log(`${new Date()} ${info.level} : ${info.message}`);
    next();
  }
}

const transport = new winston.transports.DailyRotateFile({
  filename: "./logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "1m",
  maxFiles: "14d",
  level: "silly",
});

const logger = winston.createLogger({
  level: "silly",
  // format: winston.format.json({ space: 2 }),
  format: winston.format.combine(
    winston.format.json({ space: 2 }),
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    winston.format.label({ label: "[LOGGER]" }),
    winston.format.printf(
      (info) =>
        ` ${info.label} ${info.timestamp} ${info.level} : ${info.message}`
    )
  ),
  transports: [
    // new winston.transports.Console({
    //   level: "silly",
    //   format: winston.format.combine(winston.format.colorize({ all: true })),
    // }),
    new winston.transports.File({
      handleExceptions: true,
      level: "silly",
      filename: "./logs/app.log",
    }),
    new winston.transports.File({
      handleExceptions: true,
      level: "error",
      filename: "./logs/app-error.log",
    }),
    transport,
    // new winston.transports.MongoDB({
    //   level: "error",
    //   db: await Promise.resolve(clinet),
    //   collection: "logs",
    //   capped: true,
    // }),
    new MyClass({
      level: "silly",
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
  ],
});

export default logger;
