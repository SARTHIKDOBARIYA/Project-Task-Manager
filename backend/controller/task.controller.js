import {taskService} from "../service/index.js";
import { status } from "http-status";

export const createTask = async(req,res)=>{
    try{
        const {title,description,priority,dueDate,Completed} = req.body
        const body = {
            title,
            description,
            priority,
            dueDate,
            Completed,
            owner:req.user.id
        }
        const result =await taskService.createTask(body)
        return res.status(status.OK).json({
            success:true,
            data:result
        })

    }catch(err){
        console.error(e)

        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:e.message
        })
    }
}

export const getTasks = async(req,res)=>{
    try{
        const result = await taskService.getTaskList({},{sort:{createdAt:-1}})
        return res.status(status.OK).json({
            success:true,
            data:result
        })
    }catch(e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:e.message
        })
    }
}

export const getTask = async(req,res)=>{
    try {
        const {id}=req.params
        const query = {
            id,
            owner:req.body.id
        }
        const result = await taskService.getTask(query)
        return res.status(status.OK).json({
            success:true,
            data:result
        })
    }catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:e.message
        })
    }
}

export const updateTask = async(req,res)=>{
    try {
        const {description,priority,dueDate,Completed} = req.body
        const {id}=req.params
        const body = {
            description,
            priority,
            dueDate,
            Completed
        }
        const query={
            id,
            owner:req.user.id        }
        const result = await taskService.updateTask(query,body)
        return res.status(status.OK).json({
            success:true,
            data:result
        })
    }catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:e.message
        })
    }
}

export const removeTask = async(req,res)=>{
    try {
        const result = await taskService.deleteTask({_id:req.params.id,owner:req.user.id})
    }catch (e){
        console.error(e)
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:e.message
        })
    }
}