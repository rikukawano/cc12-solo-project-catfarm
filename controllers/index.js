const express = require("express");

const router = express.Router();

const userRouter = require("./user");
const catRouter = require("./cat");

module.exports = (models) => {
  router.use("/users", userRouter(models));
  router.use("/cats", catRouter(models));

  return router;
};
