import express from "express";
import { validate } from "../middleware/validate.js";
import {taskController} from "../controller/index.js"
import {taskValidation} from "../validation/index.js"
import {auth} from "../middleware/auth.js";

const taskRouter = express.Router();

taskRouter.route("/").post(auth('user'),validate(taskValidation.createTask),taskController.createTask)

export default taskRouter;