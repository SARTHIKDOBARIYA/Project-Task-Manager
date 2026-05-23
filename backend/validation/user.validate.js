import Joi from 'joi';

export const registerUser = Joi.object({
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
})
