import express from "express";
import { validate } from "../middleware/validate.js";
import {userController} from "../controller/index.js"
import {userValidation} from "../validation/index.js"
import {auth} from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", validate(userValidation.registerUser),userController.registerUser);

userRouter.post("/login", validate(userValidation.loginUser),userController.loginUser);

userRouter.get("/me",auth, userController.getCurrentUser)

userRouter.put("/me",auth,validate(userValidation.updateUser), userController.updateUser)

userRouter.put("/password",auth,validate(userValidation.updatePassword), userController.updatePassword)

export default userRouter ;