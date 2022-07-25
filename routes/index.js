import express from "express";

import petRouter from "./user/pet.js";
import adminRouter from "./admin/admin.js";

const rootRouter = express.Router();

rootRouter.use("/", petRouter);
rootRouter.use("/admin", adminRouter);

export default rootRouter;