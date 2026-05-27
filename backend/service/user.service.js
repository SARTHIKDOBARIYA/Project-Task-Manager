import { User } from "../model/index.js";
import bcrypt from 'bcryptjs'
import {tokenService} from "./index.js";

export async function findOne(query){
    console.log("Query",query)
    const user = await User.findOne(query)
    return user
}

export async function findById(id,options){
    const user = await User.findById(id,options)
    return user
}

export async function createUser(body){
    const user=await User.create(body)
    return user
}

export async function updateUserById(id,body){
    const user = await User.findByIdAndUpdate(id,body,{new:true})
    return user
}

export async function registerUser(name,email,password){
    const existUser = await findOne(email)
    if(existUser){
        throw new Error('User already exists')
    }
    console.log("===========")
    console.log("password",password)
    const bcryptPassword = await bcrypt.hash(password, 10)
    console.log("=====bcryptPassword",bcryptPassword)
    const user = await createUser({name,email,password:bcryptPassword},{})
    return user
}

export async function login(email,password){
    console.log("password",password)
    const existUser = await findOne({email})

    const isPasswordMatch = await bcrypt.compare(password, existUser.password)
    if(!isPasswordMatch){
        throw new Error('Invalid credentials')
    }

    const token = tokenService.createToken(existUser._id)
    return {
        user:existUser,
        token
    }
}

export async function getCurrentUser(id){
    const filter={
        _id:id,
        projection:{
            name:1,
            email:1
        }
    }
    const user = await findOne(filter)
    return user
}

export async function updateUser(body){
    const existUser = await findOne(body.email)
    if(!existUser){
        throw new Error('User not found')
    }
    const updatedUser = await updateUserById(existUser._id,body)
    return updatedUser
}

export async function updatePassword(email,currentPassword,newPassword){
    if(currentPassword === newPassword){
        throw new Error('New password cannot be same as current password')
    }
    const existUser = await findOne(email)
    const isPasswordMatch = await bcrypt.compare(currentPassword, existUser.password)
    if(!isPasswordMatch){
        throw new Error('Invalid credentials')
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)
    const updatedUser = await updateUserById(existUser._id,{password:hashPassword})
    return updatedUser
}