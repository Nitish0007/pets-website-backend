const express = require("express");

const petRouter = require("./user/pet.js");
const adminRouter = require("./admin/admin.js");

const rootRouter = express.Router();

rootRouter.use("/", petRouter);
rootRouter.use("/admin", adminRouter);

module.exports = rootRouter;