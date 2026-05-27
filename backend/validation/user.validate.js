import Joi from 'joi';

export const registerUser = {
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
}

export const loginUser = {
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
}

export const updateUser = {
    body:Joi.object({
        name:Joi.string(),
        email:Joi.string().email()
    })
}

export const updatePassword = {
    body:Joi.object({
        currentPassword:Joi.string().required(),
        newPassword:Joi.string().required()
    })
}