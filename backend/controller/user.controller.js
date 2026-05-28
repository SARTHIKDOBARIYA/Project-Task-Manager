import {userService} from "../service/index.js";
import { status } from "http-status";

export const registerUser = async (req,res) =>{
    try{
        const {name,email,password}=req.body
        const user=await userService.registerUser(name,email,password)
        console.log(user)
        return res.status(status.OK).json({
            success: true,
            message:"User registered successfully",
            data:user
        })
    }catch(e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:e.message
        })
    }
}

export const loginUser = async (req,res) =>{
    try {
        const {email,password}=req.body
        console.log(req.body)
        const user = await userService.login(email,password)
        return res.status(status.OK).json({
            success: true,
            message:"User logged in successfully",
            data:user
        })
    }
    catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:e.message
        })
    }
}

export const getCurrentUser = async (req,res) =>{
    try{
        const user = await userService.getCurrentUser(req.user.id)
        return res.status(status.OK).json({
            success: true,
            message:"User logged in successfully",
            data:user
        })

    }catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:e.message
        })
    }
}

export const updateUser = async (req,res) =>{
try {
    const updatedUser = await userService.updateUser(req.body)
    return res.status(status.OK).json({
        success:true,
        message:"User updated successfully",
        data:updatedUser
    })
}catch (e){
    console.error(e)
    return res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:e.message
    })
}
}

export const updatePassword = async (req,res) =>{
    try{
        const user = await userService.updatePassword(req.user.email,req.body)
    }
    catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:e.message
        })
    }
}