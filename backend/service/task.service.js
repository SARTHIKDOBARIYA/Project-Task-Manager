import { Task } from "../model/index.js";

export async function createTask(body){
    const result =await Task.create(body)
    return result;
}

export async function getTaskList(query,options){
    const result = await Task.find(query,options)
    return result
}

export async function getTask(query,options){
    const result = await Task.findOne(query,options)
    return result
}

export async function updateTask(query,body){
    const result = await Task.findByIdAndUpdate(query,body,{new:true})
    return result;
}

export async function deleteTask(query){
    const result = await Task.findOneAndDelete(query)
    return result
}