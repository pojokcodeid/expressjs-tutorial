import logger from "./winston.js";
const logProcess = (req, res, next) => {
  // console.log({
  //   method: req.method,
  //   url: req.url,
  //   path: req.path,
  // });
  for (let i = 0; i < 2; i++) {
    logger.error("Ini contoh error " + i);
    logger.warn("Ini contoh warning" + i);
    logger.info("Ini contoh info" + i);
    logger.http("Ini contoh debug" + i);
    logger.verbose("Ini contoh verbose" + i);
    logger.debug("Ini contoh debug" + i);
    logger.silly("Ini contoh silly" + i);
  }
  next();
};

export default logProcess;
