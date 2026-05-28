import express from "express";
import { validate } from "../middleware/validate.js";
import {taskController} from "../controller/index.js"
import {taskValidation} from "../validation/index.js"
import {auth} from "../middleware/auth.js";
import {removeTask} from "../controller/task.controller.js";

const taskRouter = express.Router();

taskRouter.route("/").post(auth,validate(taskValidation.createTask),taskController.createTask)

taskRouter.route("/").get(auth,taskController.getTaskList)

taskRouter.route("/:id").get(auth,validate(taskValidation.getTask),taskController.getTask)

taskRouter.route("/:id").patch(auth,validate(taskValidation.getTask),taskController.updateTask)

taskRouter.route("/:id").delete(auth,validate(taskValidation.removeTask),taskController.removeTask)

export default taskRouter;