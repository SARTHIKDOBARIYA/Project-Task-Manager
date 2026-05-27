import userRouter  from "./user.route.js";
import taskRouter  from "./task.route.js";

import express from "express";

const router = express.Router();

router.use("/", userRouter);
router.use("/task",taskRouter)

export default router;