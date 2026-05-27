import userRouter  from "./user.route.js";

import express from "express";

const router = express.Router();

router.use("/", userRouter);

export default router;