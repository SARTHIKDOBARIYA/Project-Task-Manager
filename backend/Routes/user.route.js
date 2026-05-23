import express from "express";
import { validate } from "../middleware/validate.js";
import {userController} from "../controller/index.js"
import {userValidation} from "../validation/index.js"

const userRouter = express.Router();

userRouter.post("/", validate(userValidation.registerUser),userController.registerUser);

export { userRouter };